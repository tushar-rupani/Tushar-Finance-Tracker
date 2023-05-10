import React from "react";
import { Navbar } from "../Home/Navbar";
import "./css/Form.css";
import FormHook from "../FormHook";

export const Form = () => {
  return (
    <div>
      <Navbar />
      <FormHook />
    </div>
  );
};
