const axios = require("axios");

// provides an interface to make requests to the backend

// local
 //const baseUrl = "http://localhost:5000/products";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/products";

// read all products
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// create a new product
const create = async (newProduct) => {
  const response = await axios.post(baseUrl, newProduct);
  return response.data;
};

// update an existing product
const update = async (id, newProduct) => {
  const response = await axios.put(`${baseUrl}/${id}`, newProduct);
  return response.data;
};

// get all products and tags associated with each other
const getAllProductTags = async () => {
  const response = await axios.get(`${baseUrl}_tags`);
  return response.data;
};

// add a tag to a product
const createProductTag = async (productID, tagID) => {
  const response = await axios.put(`${baseUrl}/${productID}/tags/${tagID}`);
  return response.data;
};

// remove a tag from a product
const removeProductTag = async (productID, tagID) => {
  const response = await axios.delete(`${baseUrl}/${productID}/tags/${tagID}`);
  return response.data;
};

// read all products
const search = async (query) => {
  const response = await axios.get(`${baseUrl}?q=${query}`);
  return response.data;
};



const productService = {
  getAll,
  create,
  update,
  getAllProductTags,
  createProductTag,
  removeProductTag,
  search
};

export default productService;
