import React from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FormType } from "../models/FormTypes/Form";
interface propType {
  dataToShow: FormType;
}
export const CardComponent = ({ dataToShow }: propType) => {
  if (!dataToShow) {
    throw new Error("Something went wrong bruv! Referesh again!");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={dataToShow?.fileBase64} />}
        actions={[<EditOutlined key="edit" />]}
      >
        <h2>
          Date: <span>{dataToShow.date}</span>
        </h2>
      </Card>
    </div>
  );
};

export default CardComponent;
