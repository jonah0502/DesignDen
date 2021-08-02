const axios = require("axios");

// provides an interface to make requests to the backend

// local
 const baseUrl = "http://localhost:5000";

// production
//const baseUrl = "https://design-den-backend.herokuapp.com";

//read one address
const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/address/${id}`);
    return response.data;
  };

// read all addresses
const getAll = async () => {
  const response = await axios.get(`${baseUrl}/addresses`);
  return response.data;
};

// update an existing address
const update = async (id, newAddress) => {
    const response = await axios.put(`${baseUrl}/address/${id}`, newAddress);
    return response.data;
  };

// delete an existing adress
const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/address/${id}`);
    return response.data;
  };
  
// create a new order
const create = async (newAddress) => {
  const response = await axios.post(`${baseUrl}/addresses`, newAddress);
  return response.data;
};

  

const userService = {
    getOne,
    getAll,
    update,
    remove,
    create
};

export default userService;
