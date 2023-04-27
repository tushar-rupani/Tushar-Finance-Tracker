import React, { useState } from 'react'
import { Option } from './Option'
import { InitialOption } from './InitialOption';
import '../../Styles/forms.css'
import { months, years, transaction_type, accounts, currency, imageType } from '../../Constants/_const'
import { addObjectToLocalStorage } from '../../Services/localstorage.service';
import Filebase from 'react-file-base64'
import { Navbar } from '../Home/Navbar';
import './Css/Form.css'

export const Form = () => {
    // States being used in this Component
    const [currencyVal, setCurrencyVal] = useState("")
    const [errors, setErrors] = useState("")

    let fileBase64 = "";
    let fileType = "";
    let imageSize = 0;
    const handleCurrencyChange = (e) => {
        setCurrencyVal(e.target.value);
    }
    let requiredValidate = (value, label) => {
        if(!value.length){
            alert(`${label} is required`)
            return false
        }
        return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("")
        const { month, year, transaction, from_account, to_account, currency, amount, notes } = e.target;
        let fileData = {
            month: month.value,
            year: year.value,
            transaction: transaction.value,
            from_account: from_account.value,
            to_account: to_account.value,
            currency: currency.value,
            amount: Number(amount.value),
            notes: notes.value,
            selectedFile: fileBase64
        }
        let final_amount = amount.value.toString();

        if(!requiredValidate(fileData.month, "month") && !requiredValidate(fileData.year, "year") && !requiredValidate(fileData.transaction, "transaction") && !requiredValidate(fileData.from_account, "from_account") && !requiredValidate(fileData.to_account, "to_account") && !requiredValidate(fileData.currency, "currency") && !requiredValidate(final_amount, "amount") ){
            return;
        }

        if(from_account.value === to_account.value){
            alert("From Account and To Account can not be the same");
            return
        }
        if(notes.value.length > 255){
            alert("Value of Notes should not be greater than 255");
            return
        }
        if (!imageType.includes(fileType)) {
            alert("We allow images only, alreay told you bro");
            return 
        }
        if(imageSize > 1024000){
            alert("File Should not be greater than 1 MB")
            return
        }
        
        await addObjectToLocalStorage(fileData)
        e.target.reset();

    }

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>Date: </label>
                <input type='date' />
                <div className='flex'>
                    <select name='month'>
                        <InitialOption params="Month" />
                        {months.map((month, index) => <Option key={index} value={month} />)}
                    </select>

                    <select name='year'>
                        <InitialOption params="Year" />
                        {years.map(year => <Option value={year} />)}
                    </select>
                    <select name='transaction'>
                    <InitialOption params="Transaction" />
                    {transaction_type.map(transaction => <Option value={transaction} />)}
                </select>
                </div>

               

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
                        <InitialOption params="Currency" />
                        {currency.map(cur => <Option value={cur} />)}
                    </select>

                    <input type='number' name='amount' placeholder='Enter expenses' />
                </div>
                <label>Notes: </label>
                <textarea name='notes'>

                </textarea><br /><br />
                <Filebase type="file" name="file" multiple={false} onDone={(file) => {
                    
                    fileType = file.type;
                    imageSize = file.file.size;
                    if (!imageType.includes(file.type)) {
                        alert("We allow images only")
                        return
                    } else {
                        fileBase64 = file.base64
                    }

                    if(file.file.size > 1024000){
                       alert("File Should not be greater than 1 MB")
                       return
                    }
                }
                } />
                <input type='submit' value="Submit" />
               
            </form>
            <div>
           {errors}
            </div>
        </div>
    )
}
