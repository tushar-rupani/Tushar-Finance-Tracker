import React, { useEffect, useState, useContext } from "react";
import {
    months,
    years,
    transaction_type,
    accounts,
    currency,
    imageType,
} from "../../utils/constants/_const";
import "./css/Form.css"
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../../utils/schema'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "../../components/FormElements/Select";
import { GlobalContext } from "../../context/GlobalContext"
import { Navbar } from '../Home/Navbar'
import { INITIAL_STATE } from "../../utils/constants/_const";
import { Button } from "@mui/material";
import { base64 } from "../../utils/base64Converter";
import { Input } from "../../components/FormElements/Input";

const FormHook = ({ dataToDisplay }) => {
    const navigate = useNavigate();
    const { setData, data } = useContext(GlobalContext);
    const [formState, setFormState] = useState(INITIAL_STATE);
    const values = formState;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ values, resolver: yupResolver(schema) });
    const [fileBase64, setFileBase64] = useState("");
    let showInitialImage = dataToDisplay?.fileBase64 ? true : false;
    const [imageSelected, setImageSelected] = useState(showInitialImage);


    useEffect(() => {
        if (dataToDisplay) {
            setFormState(dataToDisplay);
            if (dataToDisplay.fileBase64 !== "") {
                setImageSelected(true);
                setFileBase64(dataToDisplay.fileBase64)
            }
        }
        // eslint-disable-next-line
    }, []);
    const onSubmitHandler = (dataFromForm) => {
        let newObj;
        if (dataToDisplay) {
            newObj = { ...dataFromForm };
            newObj["fileBase64"] = fileBase64
            let editedData = data.map((element) => element.id === dataToDisplay.id ? newObj : element)
            setData(editedData);
            navigate("/show")
            return;
        }
        newObj = { id: new Date().getTime(), ...dataFromForm };
        newObj["fileBase64"] = fileBase64;
        setData((prev) => ([newObj, ...prev]))
        toast.success("Data Submitted")
        navigate("/show")
    }

    const handleImageCancel = () => {
        delete errors["fileBase64"]
        setValue("fileBase64", "")
        setImageSelected((prev) => !prev);
        setFileBase64("");
        setFormState((prevState) => ({ ...prevState, fileBase64: "" }));
    };

    const handleFileSelect = async (e) => {
        let file = e.target.files[0];
        if (!imageType.includes(file.type)) {
            toast.error("The File you selected is not supported");
            return;
        }
        let filebase = await base64(file);
        setFileBase64(filebase);
        setImageSelected(true);
    };
    return (
        <>
            <Navbar />
            <form className="form-add" onSubmit={handleSubmit(onSubmitHandler)}>
                <Input name="date" type="date" register={register} error={errors.date} label="Date" />
                <Select name="month" data={months} register={register} error={errors.month} />
                <Select name="year" data={years} register={register} error={errors.year} />
                <Select name="transaction_type" data={transaction_type} register={register} error={errors.transaction_type} />
                <Select name="from_account" data={accounts} register={register} error={errors.from_account} />
                <Select name="to_account" data={accounts} register={register} error={errors.to_account} />
                <Select name="currency" data={currency} register={register} error={errors.currency} />
                <Input name="amount" type="number" register={register} error={errors.amount} label="Amount:" />
                <Input name="notes" type="text" register={register} error={errors.notes} label="Notes:" />


                {
                    !imageSelected && (
                        <div>
                            <input type="file" name="receipt" onChange={handleFileSelect} {...register("fileBase64", {
                                onChange: handleFileSelect
                            })} />
                            <br />
                        </div>
                    )
                }
                {
                    imageSelected && (
                        <div>
                            <img
                                src={fileBase64}
                                alt="Error in loading"
                                width={200}
                                height={200}
                            />
                            &nbsp; &nbsp;

                            <Button type="button" variant="outlined"
                                onClick={handleImageCancel}
                            >
                                X
                            </Button>
                        </div>
                    )
                }
                <div style={{ color: "red" }}>{errors.fileBase64 && errors.fileBase64.message}</div>
                <br />
                <Button variant="contained" color="info" type="submit">Submit</Button>
            </form >
        </>
    );
};

export default FormHook;