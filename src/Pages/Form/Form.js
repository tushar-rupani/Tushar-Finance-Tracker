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
  let errorObj = {};

  const [errors, setErrors] = useState({});
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "amount") {
      value = Number(value);
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (file.file.size > 1024 * 1024) {
      alert("File Should be less than 1MB");
      errorObj["fileBase64"] = "Images with less than 1 MB only";
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      errorObj["fileBase64"] = "Only images are allowed";
      return;
    }
    setImageSelected(true);
    setFileBase64(file.base64);
    setFormState((prevState) => ({ ...prevState, fileBase64: file.base64 }));
  };
  const handleSubmit = async (e, text) => {
    e.preventDefault();
    Object.keys(formState).forEach((data) => {
      if (data === "fileBase64") return;
      if (formState[data] === "") {
        errorObj[data] = "is required";
      }
    });
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      await addObjectToLocalStorage(formState);
      e.target.reset();
    }
  };

  return (
    <div>
      <Navbar />
      <FormComp
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        handleFileSelect={handleFileSelect}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        fileBase64={fileBase64}
        errors={errors}
      />
    </div>
  );
};
