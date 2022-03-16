import { message } from "antd";
import React, { useState, useEffect } from "react";
import { PlusCircleFilled } from "@ant-design/icons";

import { getItems } from "../api/inventory";
import { EmptyContent, Loading } from "../CommonComponents";
import { DODGER_BLUE } from "../config/colors";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);

  const initialise = async () => {
    try {
      setIsLoading(true);
      const response = await getItems();
      if (response.error) throw "";
      if (response.success) setInventory(response.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error("Error fetching inventory");
      console.error("Error fetching inventory", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    initialise();
  }, []);

  const onAddNewItem = () => {
    setIsAddProductVisible(true);
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <EmptyContent label="Oops! An error occurred" />
  ) : (
    <div>
      {inventory.length === 0 ? <EmptyContent label="Inventory is currently Empty" /> : <div>Inventory</div>}
      <AddItemButton onClick={onAddNewItem} />
    </div>
  );
}

const AddItemButton = ({ onClick }) => (
  <div
    style={{ position: "fixed", bottom: 25, right: 25, cursor: "pointer" }}
    title="Add New Product"
    onClick={onClick}
  >
    <PlusCircleFilled style={{ color: DODGER_BLUE, fontSize: 45 }} />
  </div>
);
