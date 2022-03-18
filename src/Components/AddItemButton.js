import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { DODGER_BLUE } from "../config/colors";

const AddItemButton = ({ onClick }) => (
  <div
    style={{ position: "fixed", bottom: 25, right: 25, cursor: "pointer", zIndex: 10 }}
    title="Add New Product"
    onClick={onClick}
  >
    <PlusCircleFilled style={{ color: DODGER_BLUE, fontSize: 45 }} />
  </div>
);

export default AddItemButton;
