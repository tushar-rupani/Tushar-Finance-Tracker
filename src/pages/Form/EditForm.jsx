import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import FormHook from "../FormHook";
import { GlobalContext } from "../../context/GlobalContext";

export const EditForm = () => {
  const params = useParams();
  const { data } = useContext(GlobalContext);
  const dataToUpdate = data.filter(d => d.id === parseInt(params.id));
  return (
    <div>
      <FormHook dataToDisplay={dataToUpdate[0]} />
    </div>
  );
};

