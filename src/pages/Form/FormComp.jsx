import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  months,
  years,
  transaction_type,
  accounts,
  currency,
} from "../../utils/constants/_const";
import Filebase from "react-file-base64";
import { InitialOption } from "../Form/InitialOption";
import { Option } from "../Form/Option";
import * as Yup from "yup";
import {
  addObjectToLocalStorage,
  editDataIntoLocal,
  get,
} from "../../services/localstorage.service";
import { useNavigate } from "react-router-dom";
const FormComp = ({ dataToDisplay }) => {
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
  const ERROR_STATE = {
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
  const navigate = useNavigate();
  let errorObj = {};
  // eslint-disable-next-line
  const [fileBase64, setFileBase64] = useState("");
  const [errors, setErrors] = useState(ERROR_STATE);
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

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (e.target.name === "to_account") {
      let from_account = formState.from_account;
      if (e.target.value === from_account) {
        setErrors((prevState) => ({
          ...prevState,
          to_account: "and From Account, Both are same",
        }));
      }
    } else if (e.target.name === "from_account") {
      let to_account = formState.to_account;
      if (e.target.value === to_account) {
        setErrors((prevState) => ({
          ...prevState,
          from_account: "and To Account, Both are same",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          to_account: "",
          from_account: "",
        }));
        delete errorObj["to_account"];
        delete errorObj["from_account"];
      }
    }

    if (errors[name]) {
      delete errorObj[name];
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "amount") {
      value = Number(value);
    }
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageCancel = () => {
    setImageSelected((prev) => !prev);
    setFileBase64("");
    setFormState((prevState) => ({ ...prevState, fileBase64: "" }));
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
      if (
        formState["from_account"] !== "" &&
        formState["to_account"] !== "" &&
        formState["from_account"] === formState["to_account"]
      ) {
        errorObj["to_account"] = "and From account can not be the same";
      }
    });
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      if (dataToDisplay) {
        editDataIntoLocal(formState.id, formState);
        navigate("/show");
        return;
      }
      await addObjectToLocalStorage(formState);
      setFormState(INITIAL_STATE);
      navigate("/show");
    }
  };

  const onSubmit = () => {
    alert("Submitted")
  }
  const validationSchema = Yup.object({
    date: Yup.string().required("Please select a product"),
  });

  const renderError = (message) => <p className="error">{message}</p>;
  return (
    <Formik initialValues={INITIAL_STATE} validationSchema={validationSchema} onSubmit={async (values, { resetForm }) => {
      console.log("submitting");
      await onSubmit(values)
      resetForm();
    }} >

      <Form className="form-add">
        <div className="container" style={{ width: "60%" }}>
          <div className="field">
            <label htmlFor="date" className="label">Date </label>
            <div className="control">
              <Field name="name" type="date" />
              <ErrorMessage name="name" render={renderError} />
            </div>
          </div>
          <button type="submit">Submit</button>
        </div>
      </Form>

    </Formik>
  );
};

export default FormComp;
