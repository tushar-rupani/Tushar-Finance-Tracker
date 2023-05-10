import React from "react";
import { useParams } from "react-router-dom";
import FormHook from "../Form/FormHook";
import { useSelector } from "react-redux";

export const EditForm = () => {
  const data = useSelector((state) => state.transactions.value)
  const params = useParams();
  const dataToUpdate = data.filter(d => d.id === parseInt(params.id));
  return (
    <div>
      <FormHook dataToDisplay={dataToUpdate[0]} />
    </div>
  );
};

