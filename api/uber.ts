import axios from 'axios';

const uberApi = axios.create({
  baseURL: 'https://diablo2.io/dclone_api.php',
  timeout: 12000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default uberApi;
