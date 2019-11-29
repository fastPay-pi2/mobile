import axios from 'axios';

const baseUrl = 'http://fastpaypi2.ml'
const authUrl = baseUrl + ':3001'
const purchaseUrl = baseUrl + ':5000'
const productsUrl = baseUrl + ':3000'

const auth = axios.create({
  baseURL: authUrl
});

const purchase = axios.create({
  baseURL: purchaseUrl
});

const products = axios.create({
  baseURL: productsUrl
})

export default {
  auth,
  purchase,
  products,
}
