import { Empty } from "antd";
import React from "react";

export default function EmptyContent({ label }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 50 }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span style={{ color: "#000" }}> {label}</span>}
      />
    </div>
  );
}
