import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

console.log("API URL:", apiUrl); // Debugging Statement

if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is not defined in the environment variables");
}

const API_URL = `${apiUrl}/api/auth`;

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.token;
};

const register = async (userData: { username: string; password: string; email?: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data.token;
};

export default {
  login,
  register,
};
