const axios = require("axios");

// provides an interface to make requests to the backend

// local
const baseUrl = "http://localhost:5000/orders";
const newBaseUrl = "http://localhost:5000/products_orders"
// production
//const baseUrl = "https://design-den-backend.herokuapp.com/orders";

//const newBaseUrl = "https://design-den-backend.herokuapp.com/products_orders";

//read one order
const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  };

// read all orders
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

//read all orders from a user

const getOrdersUser = async (id) => {
    const response = await axios.get(`${baseUrl}_user/${id}`);
    return response.data;
  };

// create a new order
const create = async (newOrder) => {
  const response = await axios.post(`${baseUrl}`, newOrder);
  return response.data;
};

// read all products from an order
const getProducts = async (id) => {
    const response = await axios.get(`${newBaseUrl}/${id}`);
    return response.data;
  };

//Read all products_orders
const getAllPO = async () => {
    const response = await axios.get(newBaseUrl);
    return response.data;
  };

//Read all products purchased by a user
const getProductsUser = async (id) => {
    const response = await axios.get(`${newBaseUrl}_user/${id}`);
    return response.data;
  };
//create PO

// create a new order
const createPO = async (newPO) => {
    const response = await axios.post(`${newBaseUrl}/`, newPO);
    return response.data;
  };
  

const userService = {
    getOne,
    getAll,
    getOrdersUser,
    create,
    getProducts,
    getAllPO,
    getProductsUser,
    createPO,
};

export default userService;
