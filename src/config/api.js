import axios from 'axios';

const baseUrl = 'http://192.168.100.125' 
const authUrl = baseUrl + ':3001'
const purchaseUrl = baseUrl + ':5000'

const auth = axios.create({
  baseURL: `${baseUrl}:3001`
});

const purchase = axios.create({
  baseURL: `${baseUrl}:5000`
});

export default {
  auth,
  purchase
}
