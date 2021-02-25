import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const token = cookie.get('token');
console.log('token', token);
let baseURL = 'https://crm-server-001.herokuapp.com/';
baseURL = 'http://localhost:5000';
console.log(' test', process.env.REACT_APP_BACKEND_URL);
baseURL =
  process.env.REACT_APP_BACKEND_URL || 'https://crm-server-001.herokuapp.com';

let headers = {};

headers.Authorization = `Bearer ${cookie.get('token')}`;

export default axios.create({
  baseURL: baseURL,
  headers,
  withCredentials: true,
});
