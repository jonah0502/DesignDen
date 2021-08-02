const axios = require("axios");

// provides an interface to make requests to the backend

// local
// const baseUrl = "http://localhost:5000/users";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/";


//read one order
const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/order/${id}`);
    return response.data;
  };

// read all orders
const getAll = async () => {
  const response = await axios.get(`${baseUrl}/orders`);
  return response.data;
};

//read all orders from a user

const getOrdersUser = async (id) => {
    const response = await axios.get(`${baseUrl}/order_user/${id}`);
    return response.data;
  };

// create a new order
const create = async (newOrder) => {
  const response = await axios.post(`${baseUrl}/orders`, newOrder);
  return response.data;
};

// read all products from an order
const getProducts = async (id) => {
    const response = await axios.get(`${baseUrl}/products_orders/${id}`);
    return response.data;
  };

//Read all products_orders
const getAllPO = async () => {
    const response = await axios.get(`${baseUrl}/products_orders`);
    return response.data;
  };

//Read all products purchased by a user
const getProductsUser = async (id) => {
    const response = await axios.get(`${baseUrl}/products_orders_user/${id}`);
    return response.data;
  };
//create PO

// create a new order
const createPO = async (newPO) => {
    const response = await axios.post(`${baseUrl}/products_orders`, newPO);
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
