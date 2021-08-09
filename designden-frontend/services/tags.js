const axios = require("axios");

// provides an interface to make requests to the backend

// local
// const baseUrl = "http://localhost:5000/tags";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/tags";

// read all tags
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// create a new tag
const create = async (newTag) => {
  const response = await axios.post(baseUrl, newTag);
  return response.data;
};

// update an existing tag
const update = async (id, newTag) => {
  const response = await axios.put(`${baseUrl}/${id}`, newTag);
  return response.data;
};

// delete an existing tag
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

// get all tags
export const getTagList = async () => {
  const response = await axios.get(`${baseUrl}/list`);
  return response.data;
};

const tagService = { getAll, create, update, remove };

export default tagService;
