import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const token = cookie.get('token');
console.log('token', token);

const baseURL = process.env.REACT_APP_BACKEND_URL;

let headers = {};

headers.Authorization = `Bearer ${cookie.get('token')}`;

export default axios.create({
  baseURL: baseURL,
  headers,
  withCredentials: true,
});
