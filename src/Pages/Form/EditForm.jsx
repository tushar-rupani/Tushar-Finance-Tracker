import React from "react";
import { useParams } from "react-router-dom";
import FormComp from "./FormComp";
import { getDataFromLocal } from "../../Services/localstorage.service";
import { Navbar } from "../Home/Navbar";
export const EditForm = () => {
  const params = useParams();
  const dataToUpdate = getDataFromLocal(params.id);
  console.log("data update", dataToUpdate);
  return (
    <div>
    <Navbar />
       <FormComp dataToDisplay={dataToUpdate}/>
    </div>
  );
};
