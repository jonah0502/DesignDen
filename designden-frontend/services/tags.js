const axios = require("axios");

// local
// const baseUrl = "http://localhost:5000/tags";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/tags";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newTag) => {
  const response = await axios.post(baseUrl, newTag);
  return response.data;
};

const update = async (id, newTag) => {
  const response = await axios.put(`${baseUrl}/${id}`, newTag);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const tagService = { getAll, create, update, remove };

export default tagService;
