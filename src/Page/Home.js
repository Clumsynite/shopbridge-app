import { message } from "antd";
import React, { useState, useEffect } from "react";
import { getItems } from "../api/inventory";
import { EmptyContent, Loading } from "../CommonComponents";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [isError, setIsError] = useState(false);

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

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <EmptyContent label="Oops! An error occurred" />
  ) : inventory.length === 0 ? (
    <EmptyContent label="Inventory is currently Empty" />
  ) : (
    <div>Inventory</div>
  );
}
