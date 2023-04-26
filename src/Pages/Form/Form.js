import React, { useEffect, useState } from 'react'
import { Option } from './Option'
import { InitialOption } from './InitialOption';
import '../../Styles/forms.css'
import { months, years, transaction_type, accounts, currency, imageType } from '../../Constants/_const'
import { addIfDoesntExists, addObjectToLocalStorage } from '../../Services/localstorage.service';
import Filebase from 'react-file-base64'

export const Form = () => {

    const INITIAL_STATE = {
        date: "",
        month: "",
        year: "",
        transaction: "",
        from_account: "",
        to_account: "",
        amount: "",
        selectedFile: ""
    }

    // States being used in this Component
    const [currencyVal, setCurrencyVal] = useState("")
    // const [value, setValue] = useState(INITIAL_STATE);
    let fileBase64 = "";
    //Handling Events
    const handleCurrencyChange = (e) => {
        setCurrencyVal(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { month, year, transaction, from_account, to_account, currency, amount } = e.target;
        let final_amount = Number(amount.value).toLocaleString('en-IN');
        let fileData = {
            month: month.value,
            year: year.value,
            transaction: transaction.value,
            from_account: from_account.value,
            to_account: to_account.value,
            amount: `${currency.value}${final_amount}`,
            selectedFile: fileBase64
        }
        await addObjectToLocalStorage(fileData)
        e.target.reset();

    }
    /* const handleNumberFormat = (e) => {
        let enteredNumber = e.target.value;
        console.log(Number(enteredNumber).toLocaleString('en-IN'));
    } */
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Date</label>
                <input type='date' />
                <div className='flex'>
                    <select name='month'>
                        <InitialOption params="Month" />
                        {months.map(month => <Option value={month} />)}
                    </select>

                    <select name='year'>
                        <InitialOption params="Year" />
                        {years.map(year => <Option value={year} />)}
                    </select>
                </div>

                <select name='transaction'>
                    <InitialOption params="Transaction" />
                    {transaction_type.map(transaction => <Option value={transaction} />)}
                </select>

                <div className='flex'>
                    <select name='from_account'>
                        <InitialOption params="From Account" />
                        {accounts.map(accs => <Option value={accs} />)}
                    </select>

                    <select name='to_account'>
                        <InitialOption params="To Account" />
                        {accounts.map(accs => <Option value={accs} />)}
                    </select>
                </div>

                <div className='flex'>
                    <select name='currency' onChange={handleCurrencyChange}>
                        <InitialOption params="Select Currency" />
                        {currency.map(cur => <Option value={cur} />)}
                    </select>

                    <input type='text' name='amount' placeholder='Enter expenses' />
                </div>
                <Filebase type="file" name="file" multiple={false} onDone={(file) => {
                    if (!imageType.includes(file.type)) {
                        alert("We allow images only")
                    } else {
                        fileBase64 = file.base64
                    }
                }
                } />
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}
