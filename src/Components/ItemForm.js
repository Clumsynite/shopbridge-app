import React, { useState } from "react";
import { Form, Input, InputNumber, Row, Col, Button, Upload, message } from "antd";
import Text from "../CommonComponents/Text";
import ImageUpload from "./ImageUpload";
import { addItem, updateItem } from "../api/inventory";
const { TextArea } = Input;

export default function ItemForm({ item, onSubmit }) {
  const [itemForm] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(item?.photo || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onFinish = async (values) => {
    try {
      await itemForm.validateFields();

      const newItem = values;
      if (imageUrl) newItem.photo = imageUrl;
      setIsSubmitting(true);
      setIsDisabled(true);
      const response = item ? await updateItem({ ...item, ...newItem }) : await addItem(newItem);
      if (response.error) throw response;
      if (response.success) {
        message.success(response.msg);
        setIsSubmitting(false);
        onSubmit(response.item);
      }
    } catch (error) {
      setIsSubmitting(false);
      setIsDisabled(false);
      message.error("Error Adding new Item");
      console.error("Error Adding new Item", error);
    }
  };

  return (
    <div>
      <Row justify="center" style={{ paddingBottom: 20 }}>
        <Text bold size={24}>
          {item ? `Edit ${item.name}` : "Add New Item"}
        </Text>
      </Row>
      <Form form={itemForm} name="register" onFinish={onFinish} initialValues={item} scrollToFirstError>
        <Row>
          <Col span={15}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: "Please input Product's Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Product Description"
              rules={[
                {
                  required: true,
                  message: "Please input Product's Description",
                },
              ]}
            >
              <TextArea showCount style={{ height: 80 }} />
            </Form.Item>
            <Input.Group>
              <Row justify="space-between">
                <Col>
                  <Form.Item
                    name="price"
                    label="Product Price"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product's Price",
                      },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name="quantity"
                    label="Product Quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product's Quantity",
                      },
                    ]}
                  >
                    <InputNumber min={0} max={1000} />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Col>
          <Col
            span={8}
            offset={1}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} disabled={isDisabled} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 20 }} justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Add New Item
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}
