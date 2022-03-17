import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}`;

export const getItems = async () => {
  try {
    const response = await axios.get(`${url}/inventory`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getItem = async (id) => {
  try {
    const response = await axios.get(`${url}/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(`${url}/inventory`, item);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateItem = async (item) => {
  try {
    const response = await axios.put(`${url}/inventory`, item);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteItem = async (item) => {
  try {
    const response = await axios.delete(`${url}/inventory`, item);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
