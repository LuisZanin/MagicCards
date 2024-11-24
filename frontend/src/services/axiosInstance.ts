import axios from 'axios';

// Cria uma instância do Axios com o token JWT
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

// Adiciona o token de autenticação ao cabeçalho das requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
