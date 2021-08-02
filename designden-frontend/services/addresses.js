const axios = require("axios");

// provides an interface to make requests to the backend

// local
// const baseUrl = "http://localhost:5000/addresses/";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/addresses/";

//read one address
const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}${id}`);
  return response.data;
};

// read all addresses
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// update an existing address
const update = async (id, newAddress) => {
  const response = await axios.put(`${baseUrl}${id}`, newAddress);
  return response.data;
};

// delete an existing adress
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}${id}`);
  return response.data;
};

// create a new order
const create = async (newAddress) => {
<<<<<<< HEAD
  const response = await axios.post(`http://localhost:5000/addresses/`, newAddress);
=======
>>>>>>> fa5d50720b6640276c2adca94e2ff0bd3e767eae
  return response.data;
};

const userService = {
  getOne,
  getAll,
  update,
  remove,
  create,
};

export default userService;
