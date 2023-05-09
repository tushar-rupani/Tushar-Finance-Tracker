import React, { useEffect, useState } from "react";
import {
    months,
    years,
    transaction_type,
    accounts,
    currency,
    imageType,
} from "../utils/constants/_const";

import Filebase from "react-file-base64";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addObjectToLocalStorage, get } from "../services/localstorage.service";
import { editDataIntoLocal } from "../services/localstorage.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "../components/FormElements/Select";

import { Navbar } from './Home/Navbar'
const schema = Yup.object().shape({
    date: Yup.string()
        .required('Date is required!'),
    month: Yup.string()
        .required('Month is Required'),
    year: Yup.string().required('Year is Required'),
    transaction_type: Yup.string().required('Transaction Type is Required'),
    from_account: Yup.string().required('From Account is Required!'),
    to_account: Yup.string()
        .notOneOf([Yup.ref('from_account'), null], "Matches with From Account!")
        .required('To Account Required')
    ,
    amount: Yup.number().min(1, "Should be Greater than 1").max(10000, "Should not be greater than 10000").required("Amount is required"),
    notes: Yup.string().required("Note is required"),
    currency: Yup.string().required("Currency is required"),
});


const FormHook = ({ dataToDisplay }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    let user = get("token");
    const INITIAL_STATE = {
        id: new Date().getTime(),
        user: user.email,
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
    // eslint-disable-next-line
    const [fileBase64, setFileBase64] = useState("");
    let initialDataToShow = dataToDisplay ? dataToDisplay : INITIAL_STATE;
    let showInitialImage = dataToDisplay ? true : false;
    const [formState, setFormState] = useState(initialDataToShow);
    const [imageSelected, setImageSelected] = useState(showInitialImage);

    useEffect(() => {
        if (formState.fileBase64 === "") {
            setImageSelected(false);
        }
        // eslint-disable-next-line
    }, []);
    const onSubmitHandler = (e) => {
        if (dataToDisplay) {
            editDataIntoLocal(formState.id, formState)
            navigate("/show")
            return;
        }
        addObjectToLocalStorage(formState);
        navigate("/show")
    }

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleImageCancel = () => {
        setImageSelected((prev) => !prev);
        setFileBase64("");
        setFormState((prevState) => ({ ...prevState, fileBase64: "" }));
    };

    const handleFileSelect = (file) => {

        if (!imageType.includes(file.type)) {
            toast.error("Only images are allowed")
            return;
        }
        if (file.file.size > 1024 * 1024) {
            toast.error("File Should be less than 1MB");
            return;
        }
        setImageSelected(true);
        setFileBase64(file.base64);
        setFormState((prevState) => ({ ...prevState, fileBase64: file.base64 }));
    };
    return (
        <>
            <Navbar />
            <form className="form-add" onSubmit={handleSubmit((e) => onSubmitHandler(e))}>
                <div>
                    <label>Date: </label>
                    <input
                        {...register('date', {
                            onChange: handleChange,
                        })}
                        value={formState.date}
                        type="date"
                        name="date"
                    />
                    {errors.date && errors.date.message}

                </div>
                <Select name="month" value={formState.month} register={register} handleChange={handleChange} data={months} error={errors.month} />

                <Select name="year" value={formState.year} register={register} handleChange={handleChange} data={years} error={errors.year} />

                <Select name="transaction_type" value={formState.transaction_type} register={register} handleChange={handleChange} data={transaction_type} error={errors.transaction_type} />

                <Select name="from_account" value={formState.from_account} register={register} handleChange={handleChange} data={accounts} error={errors.from_account} />

                <Select name="to_account" value={formState.to_account} register={register} handleChange={handleChange} data={accounts} error={errors.to_account} />

                <Select name="currency" value={formState.currency} register={register} handleChange={handleChange} data={currency} error={errors.currency} />
                <br /><br />
                <label>Amount: </label>
                <input
                    type="number"
                    name="amount"
                    value={formState.amount}
                    placeholder="Enter expenses"
                    {...register("amount", {
                        onChange: handleChange,
                    })}

                />
                {errors.amount && errors.amount.message}
                <br />
                <br />
                <label>Notes: </label>
                <textarea
                    name="notes"
                    value={formState.notes}
                    {...register("notes", {
                        onChange: handleChange,
                    })}
                ></textarea>
                {errors.notes && errors.notes.message}
                <br />
                <br />

                {
                    !imageSelected && (
                        <div>
                            <Filebase
                                type="file"
                                name="fileBase64"
                                multiple={false}
                                onDone={handleFileSelect}
                            />
                            <br />
                            {errors.fileBase64 && errors.fileBase64.message}
                            <br />
                        </div>
                    )
                }
                {
                    imageSelected && (
                        <div>
                            <img
                                src={formState.fileBase64}
                                alt="Error in loading"
                                width={200}
                                height={200}
                            />
                            <button type="button"
                                onClick={handleImageCancel}
                            >
                                X
                            </button>
                        </div>
                    )
                }
                <input type="submit" value="Submit" />
                <ToastContainer />
            </form >
        </>
    );
};

export default FormHook;