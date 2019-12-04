import axios from 'axios';

const baseUrl = 'http://fastpaypi2.ml'
const authUrl = baseUrl + ':3001'
const purchaseUrl = baseUrl + ':5000'
const productsUrl = baseUrl + ':3000'

const recommendationUrl = 'https://gist.githubusercontent.com/cjjcastro/0dea5f9ff7827f354a7338e2ab377084/raw/e65e1a367dd6d170b960312f094a7f01186b1d42/fastpay%2520list'

const auth = axios.create({
  baseURL: authUrl
});

const purchase = axios.create({
  baseURL: purchaseUrl
});

const products = axios.create({
  baseURL: productsUrl
})

const recommendation = axios.create({
  baseURL: recommendationUrl
})

export default {
  auth,
  purchase,
  products,
  recommendation
}
