const axios = require("axios");

// local
const baseUrl = "http://localhost:5000/products";

// production
// const baseUrl = "https://design-den-backend.herokuapp.com/products";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newProduct) => {
  const response = await axios.post(baseUrl, newProduct);
  return response.data;
};

const update = async (id, newProduct) => {
  const response = await axios.put(`${baseUrl}/${id}`, newProduct);
  return response.data;
};

const getAllProductTags = async () => {
  const response = await axios.get(`${baseUrl}_tags`);
  return response.data;
};

const createProductTag = async (productID, tagID) => {
  const response = await axios.put(`${baseUrl}/${productID}/tags/${tagID}`);
  return response.data;
};

const removeProductTag = async (productID, tagID) => {
  const response = await axios.delete(`${baseUrl}/${productID}/tags/${tagID}`);
  return response.data;
};

const productService = {
  getAll,
  create,
  update,
  getAllProductTags,
  createProductTag,
  removeProductTag,
};

export default productService;
