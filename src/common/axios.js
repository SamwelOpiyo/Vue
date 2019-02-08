import axios from 'axios'

export const BEERS_API = axios.create({
  baseURL: 'https://api.punkapi.com/v2/'
})