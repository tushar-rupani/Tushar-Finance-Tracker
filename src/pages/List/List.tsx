import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const List = () => {
  console.log(
    useSelector((state: RootState) => console.log(state.transactions.value))
  );

  return <></>;
};
