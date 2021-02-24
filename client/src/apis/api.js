import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const token = cookie.get('token');
//
export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Authorization': `Bearer ${cookie.get('token')}`,
  },
  withCredentials: true,
});
