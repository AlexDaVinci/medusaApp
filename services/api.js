import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://production.medusaapi.online/api/v1', // URL base de la API
});

export const login = async (email, password) => {
  try {
    const response = await instance.post('/auth/login', {
      email,
      password,
    });
    return response.data; // Retorna los datos del usuario y token
  } catch (error) {
    throw error;
  }
};