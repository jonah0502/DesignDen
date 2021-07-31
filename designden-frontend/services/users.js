const axios = require("axios");

// provides an interface to make requests to the backend

// local
// const baseUrl = "http://localhost:5000/users";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/users";

// read all users
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// create a new user
const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

// update existing user
const update = async (id, newUser) => {
  const response = await axios.put(`${baseUrl}/${id}`, newUser);
  return response.data;
};

// get all cart data
const getAllCarts = async () => {
  const response = await axios.get(`${baseUrl}_products`);
  return response.data;
};

// add a product to a users cart
const addToCart = async (userID, productID, quantity) => {
  const response = await axios.put(
    `${baseUrl}/${userID}/products/${productID}`,
    { quantity: quantity }
  );
  return response.data;
};

// remove a product from a users cart
const removeFromCart = async (userID, productID) => {
  const response = await axios.delete(
    `${baseUrl}/${userID}/products/${productID}`
  );
  return response.data;
};

// get products in a single users cart
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
