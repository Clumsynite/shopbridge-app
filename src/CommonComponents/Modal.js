import { Modal as AntdModal } from "antd";
import React from "react";

export default function Modal({ visible, onCancel, children, ...rest }) {
  return (
    <AntdModal centered visible={visible} onCancel={onCancel} title={null} footer={null} closable={false} {...rest}>
      {children}
    </AntdModal>
  );
}
