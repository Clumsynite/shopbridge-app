import { message, Pagination, Row } from "antd";
import _ from "lodash";
import React, { useState, useEffect } from "react";
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
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);

  const sortByDate = (array) =>
    array.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const initialise = async () => {
    try {
      setIsLoading(true);
      const response = await getItems();
      if (response.error) throw response;
      if (response.success) {
        let inventory = response.items;
        console.log({ inventory });
        inventory = sortByDate(inventory);
        setInventory(inventory);
        setFilteredInventory(_.slice(inventory, 0, itemsPerPage));
      }
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

  useEffect(() => {
    let clonedInventory = [...inventory];
    clonedInventory = sortByDate(clonedInventory);
    setFilteredInventory(_.slice(clonedInventory, pageOffset, pageOffset + itemsPerPage));
  }, [currentPage, itemsPerPage, inventory]);

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
    clonedInventory = sortByDate(clonedInventory);
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
        clonedInventory = _.orderBy(clonedInventory, ["createdAt"], ["desc"]);
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

  const handlePageChange = (page) => {
    const currentPage = page - 1;
    const offset = currentPage * itemsPerPage;
    setCurrentPage(page);
    setPageOffset(offset);
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
              {filteredInventory.map((item) => (
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
          <Row style={{ padding: "30px 0" }} align="middle" justify="center">
            <Pagination
              showSizeChanger
              onShowSizeChange={(_, pageSize) => setItemsPerPage(pageSize)}
              current={currentPage}
              total={inventory.length}
              pageSize={itemsPerPage}
              hideOnSinglePage
              onChange={handlePageChange}
            />
          </Row>
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
