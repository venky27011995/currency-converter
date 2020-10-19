import React from 'react'

export default function Converter({
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
}) {

    let currencyList;
    if (currencyOptions) {
        currencyList = currencyOptions.map((option) => {
            return <option value={option} key={option}>{option}</option>;
        })
    }
    return (
        <div className='converter'>
            <input type="number" className="form-control"
                value={amount}
                onChange={onChangeAmount}
            />
            <select className="form-control"
                value={selectedCurrency}
                onChange={onChangeCurrency}
            >
                {currencyList}
            </select>
        </div>
    )
}

