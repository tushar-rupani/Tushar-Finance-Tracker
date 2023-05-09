import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    months,
    years,
    transaction_type,
    accounts,
    currency,
    imageType,
} from '../utils/constants/_const';
const SignupSchema = Yup.object().shape({
    date: Yup.string()
        .required('Date is required!'),
    month: Yup.string()
        .required('Month is Required'),
    year: Yup.string().required('Year is Required'),
    transaction_type: Yup.string().required('Transaction Type is Required'),
    from_account: Yup.string().required('From Account is Required!'),
    to_account: Yup.string()
        .notOneOf([Yup.ref('from_account'), null], "Matches with From Account!")
        .required('To Account Required'),
    amount: Yup.number().min(1, "Should be Greater than 1").max(10000, "Should not be greater than 10000").required("Amount is required"),
    notes: Yup.string().required("Note is required"),
    receipt: Yup.mixed()
        .notRequired()
        .test("FILE_SIZE", "Uploaded file is too big.",
            value => !value || (value && value.size <= (1024 * 1024)))
        .test("FILE_FORMAT", "Uploaded file has unsupported format.",
            value => !value || (value && imageType.includes(value.type)))
});
const submitData = (values) => {
    console.log("came here", values);
}


export const FormikValidation = ({ dataToDisplay }) => {
    const INITIAL_STATE = {
        id: new Date().getTime(),
        user: "tushar",
        date: "",
        month: "",
        year: "",
        transaction_type: "",
        from_account: "",
        to_account: "",
        currency: "",
        amount: "",
        notes: "",
        fileBase64: "",
    };
    let initialDataToShow = dataToDisplay ? dataToDisplay : INITIAL_STATE;
    const [formState, setFormState] = useState(initialDataToShow);
    // const handleChange = (e) => {
    //     setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // }
    return (
        <div>
            <h1>Add Transaction</h1>
            <Formik
                initialValues={{
                    date: '',
                    month: '',
                    year: '',
                    transaction_type: '',
                    from_account: '',
                    to_account: '',
                    currency: '',
                    amount: '',
                    notes: '',
                    receipt: ''
                }}
                validationSchema={SignupSchema}
                validateOnBlur={false}
                onSubmit={(values) => {
                    submitData(values)
                }}
                onChange={(e) => console.log(e.target.name)}
            >
                {({ handleChange, onSubmit }) => (
                    <Form className='form-add'>
                        <Field name="date" type="date" value={formState.date} onChange={handleChange} />
                        <ErrorMessage name='date' />
                        <br />
                        <Field as="select" name="month" onChange={handleChange}>
                            <option value="" disabled>Select Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </Field> <br />
                        <ErrorMessage name='month' />
                        <Field as="select" name="year" value={formState.year} onChange={handleChange}>
                            <option value="" disabled>Select Year</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='year' />

                        <Field as="select" name="transaction_type" value={formState.transaction_type} onChange={handleChange}>
                            <option value="" disabled>Select Transaction Type</option>
                            {transaction_type.map((transaction, index) => (
                                <option key={index} value={transaction}>{transaction}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='transaction_type' />

                        <Field as="select" name="from_account" value={formState.from_account} onChange={handleChange}>
                            <option value="" disabled>Select From Account</option>
                            {accounts.map((account, index) => (
                                <option key={index} value={account}>{account}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='from_account' />

                        <Field as="select" name="to_account" value={formState.to_account} onChange={handleChange}>
                            <option value="" disabled>Select To Account</option>
                            {accounts.map((account, index) => (
                                <option key={index} value={account}>{account}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='to_account' />

                        <Field as="select" name="currency" value={formState.currency} onChange={handleChange}>
                            <option value="" disabled>Select Currency</option>
                            {currency.map((currency, index) => (
                                <option key={index} value={currency}>{currency}</option>
                            ))}
                        </Field> <br />
                        <ErrorMessage name='currency' />

                        <Field name="amount" type="number" value={formState.amount} onChange={handleChange} placeholder="Enter Amount" /> <br />
                        <ErrorMessage name='amount' />
                        <Field name="notes" value={formState.notes} onChange={handleChange} as="textarea" />
                        <ErrorMessage name='notes' /><br />

                        <input type="file" name="receipt" id="" /> <br /><br />
                        <ErrorMessage name='receipt' />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div >
    );
};