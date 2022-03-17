import { Col, Row } from "antd";
import React from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Text from "../CommonComponents/Text";
import "../styles/ItemCard.css";
import ItemAvatar from "./ItemAvatar";
import { CRIMSON, DODGER_BLUE } from "../config/colors";

export default function ItemCard({ item, onEdit, onDelete }) {
  const { photo, name, description, price, quantity } = item;
  return (
    <div className="card_body">
      <div className="card_actions">
        <Row justify="space-between" align="middle">
          <DeleteFilled
            style={{ color: CRIMSON, fontSize: 24, cursor: "pointer" }}
            onClick={onDelete}
            title="Delete Item"
          />
          <EditFilled
            style={{ color: DODGER_BLUE, fontSize: 24, cursor: "pointer" }}
            onClick={onEdit}
            title="Edit Item"
          />
        </Row>
      </div>
      <div className="card_avatar">
        <ItemAvatar photo={photo} name={name} />
      </div>
      <div className="card_title">
        <Text size={24} bold>
          {name}
        </Text>
      </div>
      <div className="card_desc">
        <Text style={{ fontStyle: "italic" }}>{description}</Text>
      </div>
      <Row className="card_details" align="middle" justify="space-between">
        <Col>
          <Row className="card_price" align="middle">
            <Text size={20} bold>
              Rs. {price}
            </Text>
          </Row>
        </Col>
        <Col>
          <div className="card_quantity">
            {quantity > 0 ? (
              <Row align="middle">
                <Text size={20} bold>
                  {quantity}
                </Text>
                <div style={{ paddingLeft: 6 }}>in Stock</div>
              </Row>
            ) : (
              <Text style={{ fontStyle: "italic" }}>Out of Stock</Text>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
