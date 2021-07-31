const axios = require("axios");

// provides an interface to make requests to the backend

// local
// const baseUrl = "http://localhost:5000/reviews";

// production
const baseUrl = "https://design-den-backend.herokuapp.com/reviews";

// read all reviews
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// create a new review
const create = async (newReview) => {
  const response = await axios.post(baseUrl, newReview);
  return response.data;
};

// update an existing review
const update = async (id, newReview) => {
  const response = await axios.put(`${baseUrl}/${id}`, newReview);
  return response.data;
};

// delete an existing review
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const reviewService = { getAll, create, update, remove };

export default reviewService;
