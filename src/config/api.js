import axios from 'axios';

const baseUrl = 'http://172.16.1.23' 
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
