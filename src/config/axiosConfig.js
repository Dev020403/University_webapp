// src/config/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://university-backend-vxc9.onrender.com',
});

export default axiosInstance;
