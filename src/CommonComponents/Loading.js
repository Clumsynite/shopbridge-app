import React from "react";
import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      padding: 100,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin />
  </div>
);

export default Loading;
