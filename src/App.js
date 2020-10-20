import React, { useEffect, useState } from 'react';
import './App.css';
import Converter from './Converter';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';
function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState()
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [date, setDate] = useState()
  console.log(2 * exchangeRate)

  let fromAmount, toAmount
  if (setAmountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate

  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;

  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        let firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        setDate(data.date)
      })

  }, []);

  // useEffect hook wil call when user made change of currency type fields
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency]);
        })
    }
  }, [fromCurrency, toCurrency])

  function onChangeFromAmount(e) {
    fromAmount = e.target.value;
    setAmount(fromAmount);
    setAmountInFromCurrency(true)
  }

  function onChangeToAmount(e) {
    toAmount = e.target.value;
    setAmount(toAmount);
    setAmountInFromCurrency(false)
  }


  return (
    <div className="app">
      <div className="app_bodyContainer">
        <h2>Currency Converter</h2>
        <p><strong>Date:</strong><span>{date}</span></p>
        <Converter
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          amount={fromAmount}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={onChangeFromAmount}
        />

        <img src="https://www.freeiconspng.com/uploads/arrow-up-icon-29.png" className="img-fluid w-25" alt="up and down arrow" />
        <Converter
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          amount={toAmount}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={onChangeToAmount}
        />
      </div>
    </div>
  );
}

export default App;
