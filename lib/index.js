const axios = require("axios");

const getBooks = async (query) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    return response?.data?.items;
  } catch (error) {
    return { success: false };
  }
};

module.exports = { getBooks };
