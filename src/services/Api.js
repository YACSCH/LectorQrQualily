import axios from 'axios';

const API_URL = 'https://backqr-75vx.onrender.com/api/v1';


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
   
   if (response.data.code === 200 && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Token no recibido');
    } 
  } catch (error) {
   throw new Error(error?.response?.data?.message || "Error al obtener los datos");
  }
};


export const fetchDataByCodigo = async (codigo, token) => {
  try {
    const response = await axios.get(`${API_URL}/lotes/${codigo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Datos no encontrados');
    }
  } catch (error) {
   throw new Error(error?.response?.data?.message || "Error al obtener los datos");
  }
};