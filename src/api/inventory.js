const url = `${process.env.REACT_APP_API_URL}`;

export const getItems = async () => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getItem = async (id) => {
  try {
    const response = await fetch(`${url}/inventory/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addItem = async (item) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = async (item) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (item) => {
  try {
    const response = await fetch(`${url}/inventory`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
