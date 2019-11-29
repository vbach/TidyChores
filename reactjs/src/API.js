import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_URL || 'https://endpoint.yourcode.app/vbach/api'
});

export default API;
