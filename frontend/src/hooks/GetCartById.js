import axios from 'axios';

const getCartById = async (userId) => {
  try {
    const response = await axios.get(`https://triwizardsof.maurice.webcup.hodi.host/cart/${userId}`);
    return response.data;
  } catch (error) {
    return null
  }
};

export default getCartById;