import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';



const instance = axios.create({
    baseURL: `${apiUrl}/api`, 
    withCredentials: true,
});

export default instance;
