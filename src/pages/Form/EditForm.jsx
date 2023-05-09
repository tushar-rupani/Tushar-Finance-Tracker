import React from "react";
import { useParams } from "react-router-dom";
import { getDataFromLocal } from "../../services/localstorage.service";
import FormHook from "../FormHook";
export const EditForm = () => {
  const params = useParams();
  const dataToUpdate = getDataFromLocal(params.id);
  return (
    <div>
      <FormHook dataToDisplay={dataToUpdate} />
    </div>
  );
};

