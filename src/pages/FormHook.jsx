import React, { useEffect, useState, useContext } from "react";
import {
    months,
    years,
    transaction_type,
    accounts,
    currency,
    // imageType,
} from "../utils/constants/_const";
import './Form/css/Form.css'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../utils/schema'
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "../components/FormElements/Select";
// import { GlobalContext } from "../context/GlobalContext"
import { Navbar } from './Home/Navbar'
import { INITIAL_STATE } from "../utils/constants/_const";


const FormHook = ({ dataToDisplay }) => {
    // const navigate = useNavigate();
    // const { setData } = useContext(GlobalContext);
    const [formState, setFormState] = useState(INITIAL_STATE);
    const values = formState;
    // console.log("values", values);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ values, resolver: yupResolver(schema) });
    // eslint-disable-next-line
    const [fileBase64, setFileBase64] = useState("");
    let showInitialImage = dataToDisplay ? true : false;
    const [imageSelected, setImageSelected] = useState(showInitialImage);


    useEffect(() => {
        if (formState.fileBase64 === "") {
            setImageSelected(false);
        }
        if (dataToDisplay) {
            setFormState(dataToDisplay);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log("called")
    }, [formState])
    const onSubmitHandler = (data) => {
        // setValue(INITIAL_STATE)
        console.log("data coming from form", data);
        // if (dataToDisplay) {
        //     editDataIntoLocal(formState.id, formState)
        //     navigate("/show")
        //     return;
        // }
        // setData((prev) => ([formState, ...prev]))
        // toast("Data Submitted")
        // navigate("/show")
    }

    const handleImageCancel = () => {
        setImageSelected((prev) => !prev);
        setFileBase64("");
        setFormState((prevState) => ({ ...prevState, fileBase64: "" }));
    };

    const handleFileSelect = (e) => {
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFileBase64(reader.result);
            setImageSelected(true);
            setFormState((prevState) => ({ ...prevState, fileBase64: reader.result }));
        }
    };
    return (
        <>
            <Navbar />
            <form className="form-add" onSubmit={handleSubmit(onSubmitHandler)}>
                <div>
                    <label>Date: </label>
                    <input
                        {...register('date')}
                        type="date"
                        name="date"
                    />
                    <div style={{ color: "red" }}>{errors.date && errors.date.message}</div>
                </div>
                <Select name="month" data={months} register={register} error={errors.month} />
                <Select name="year" data={years} register={register} error={errors.year} />
                <Select name="transaction_type" data={transaction_type} register={register} error={errors.transaction_type} />
                <Select name="from_account" data={accounts} register={register} error={errors.from_account} />
                <Select name="to_account" data={accounts} register={register} error={errors.from_account} />
                <Select name="currency" data={currency} register={register} error={errors.currency} />


                <br /><br />
                <label>Amount: </label>
                <input
                    type="number"
                    name="amount"
                    placeholder="Enter expenses"
                    {...register("amount")}

                />
                <div style={{ color: "red" }}>{errors.amount && errors.amount.message}</div>
                <br />
                <br />
                <label>Notes: </label>
                <textarea
                    name="notes"
                    {...register("notes")}
                ></textarea>
                <div style={{ color: "red" }}>{errors.notes && errors.notes.message}</div>
                <br />
                <br />

                {
                    !imageSelected && (
                        <div>
                            <input type="file" name="receipt" onChange={handleFileSelect} {...register("fileBase64")} />
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
                {errors.receipt && errors.receipt.message}
                <input type="submit" value="Submit" />
                <ToastContainer />
            </form >
        </>
    );
};

export default FormHook;