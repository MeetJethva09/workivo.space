import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Points to your Express backend
  withCredentials: true, // Allows cookies to be sent and received
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
