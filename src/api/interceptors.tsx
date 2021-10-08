import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

api.interceptors.response.use((response) => {
  console.log('interceptor', response)
  return response
},
(error) => {
  console.log(error)
  return Promise.reject(error)
})
