import { Modal } from "antd";
import React, { useState, useEffect } from "react";

export default function AddItemModal() {
  return (
    <Modal centered visible={visible} onCancel={onCancel} title={null} footer={null}>
      <div></div>
    </Modal>
  );
}
