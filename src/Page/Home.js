import { message } from "antd";
import _, { clone } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { deleteItem, getItems } from "../api/inventory";
import { EmptyContent, Loading } from "../CommonComponents";
import Modal from "../CommonComponents/Modal";
import AddItemButton from "../Components/AddItemButton";
import ItemCard from "../Components/ItemCard";
import ItemForm from "../Components/ItemForm";
import "../styles/Home.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const initialise = async () => {
    try {
      setIsLoading(true);
      const response = await getItems();
      if (response.error) throw response;
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

  const onAddItemClose = () => setIsAddProductVisible(false);

  const onAddItem = (item) => {
    let clonedInventory = _.cloneDeep(inventory);
    let existingItem = _.findIndex(clonedInventory, { _id: item._id });
    if (existingItem > -1) {
      clonedInventory[existingItem] = item;
    } else {
      clonedInventory.push(item);
    }
    setInventory([...clonedInventory]);
    onAddItemClose();
  };

  const onEditItem = (item) => {
    setSelectedItem(item);
    setIsAddProductVisible(true);
  };

  const onDeleteItem = async (item) => {
    try {
      setIsDeleting(item._id);
      const response = await deleteItem(item);
      if (response.error) throw response;
      if (response.success) {
        let clonedInventory = _.cloneDeep(inventory);
        clonedInventory = _.reject(clonedInventory, (i) => i._id === item._id);
        setInventory([...clonedInventory]);
        message.success(response.msg);
      }
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      message.error("Error deleting item");
      console.error("Error deleting item", error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <EmptyContent label="Oops! An error occurred" />
  ) : (
    <div>
      {inventory.length === 0 ? (
        <EmptyContent label="Inventory is currently Empty" />
      ) : (
        <div style={{ padding: "20px 12px" }}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1240: 4 }}
            // columns={5}
          >
            <Masonry gutter="20px">
              {inventory.map((item) => (
                <ItemCard
                  item={item}
                  key={item._id}
                  isDeleting={isDeleting === item._id}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
      <AddItemButton onClick={onAddNewItem} />
      {isAddProductVisible && (
        <Modal visible={isAddProductVisible} onCancel={onAddItemClose} width={"60vw"}>
          <ItemForm onSubmit={onAddItem} item={selectedItem} />
        </Modal>
      )}
    </div>
  );
}
