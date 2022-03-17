import React, { useState } from "react";
import { Upload, message, Modal, Button, Row } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "../styles/ImageUpload.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const ImageUpload = ({ imageUrl, setImageUrl, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = async (info) => {
    try {
      setIsLoading(true);
      const imageUri = await getBase64(info.file.originFileObj);
      setIsLoading(false);
      setFile(info.file);
      setImageUrl(imageUri);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    setPreviewVisible(true);
  };

  const uploadButton = (
    <div style={{ padding: 20, border: "1px dotted lightgrey", textAlign: "center", cursor: "pointer" }}>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Upload
        disabled={disabled}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        style={{
          width: "80%",
          height: "auto",
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
      </Upload>
      <Row style={{ padding: 10 }} align="middle" justify="center">
        <Button onClick={handlePreview} size="small" style={{ marginRight: 10 }}>
          Preview
        </Button>
        <Button onClick={() => (!disabled ? setImageUrl("") : null)} style={{ marginLeft: 10 }} size="small">
          Clear
        </Button>
      </Row>
      {previewVisible && (
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
          centered
          width={"80vw"}
        >
          <img alt="example" style={{ width: "100%", height: "auto" }} src={previewImage} />
        </Modal>
      )}
    </div>
  );
};

export default ImageUpload;
