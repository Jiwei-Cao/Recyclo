import axios from 'axios'

const api = axios.create({
    baseURL: "https://recyclo-service.onrender.com"
});

export default api;