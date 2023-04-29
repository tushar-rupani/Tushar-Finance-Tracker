import React from "react";
import "../../Styles/forms.css";
import { addObjectToLocalStorage } from "../../Services/localstorage.service";
import { Navbar } from "../Home/Navbar";
import "./Css/Form.css";
import FormComp from "./FormComp";
import { useState } from "react";

export const Form = () => {
  const [imageSelected, setImageSelected] = useState(false);
  const [fileBase64, setFileBase64] = useState("");
  const [formState, setFormState] = useState({
    id: new Date().getTime(),
    date: "",
    month: "",
    year: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    currency: "",
    amount: "",
    notes: "",
    fileBase64: "",
  });

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    if(name === "amount"){
        value = Number(value);
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    console.log(formState);
  };

  const handleFileSelect = (file) => {
    if (file.file.size > 1024 * 1024) {
      alert("File Should be less than 1MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only image files are allowed.");
      return;
    }
    setImageSelected(true)
    setFileBase64(file.base64)
    setFormState((prevState) => ({...prevState, fileBase64: file.base64}))
  };
  const handleSubmit = async (e, text) => {
    e.preventDefault();
    // setFormState((prevState) => ({...prevState, id: new Date().getTime() }))
    await addObjectToLocalStorage(formState)
    e.target.reset();
  };

  return (
    <div>
      <Navbar />
      <FormComp
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        handleFileSelect={handleFileSelect}
        imageSelected = {imageSelected}
        setImageSelected = {setImageSelected}
        fileBase64 = {fileBase64}
      />
      <div></div>
    </div>
  );
};
