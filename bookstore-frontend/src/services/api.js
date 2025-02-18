import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getBooks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(API_BASE_URL, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
