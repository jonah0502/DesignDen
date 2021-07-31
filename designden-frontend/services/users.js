const axios = require("axios");

// local
// const baseUrl = "http://localhost:5000/users";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const update = async (id, newUser) => {
  const response = await axios.put(`${baseUrl}/${id}`, newUser);
  return response.data;
};

const getAllCarts = async () => {
  const response = await axios.get(`${baseUrl}_products`);
  return response.data;
};

const addToCart = async (userID, productID, quantity) => {
  const response = await axios.put(
    `${baseUrl}/${userID}/products/${productID}`,
    { quantity: quantity }
  );
  return response.data;
};

const removeFromCart = async (userID, productID) => {
  const response = await axios.delete(
    `${baseUrl}/${userID}/products/${productID}`
  );
  return response.data;
};

const getUserCart = async (userID) => {
  const response = await axios.get(`${baseUrl}/${userID}/products`);
  return response.data;
};

const userService = {
  getAll,
  create,
  update,
  getAllCarts,
  addToCart,
  removeFromCart,
  getUserCart,
};

export default userService;
