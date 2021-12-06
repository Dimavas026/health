import axios from 'axios'
import { AuthResponse } from '../services/auth'

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'http://localhost:8080/api',
  withCredentials: true,
})

api.interceptors.response.use((response) => response,
  (error) => {
    if (error.response?.status === 401) {
      axios.get<AuthResponse>(
        `${process.env.REACT_APP_BASE_URL}/refresh`,
        { withCredentials: true },
      ).then(({ data }) => {
        localStorage.setItem('accessToken', data.accessToken)
        error.response.headers.authorization = `Bearer ${data.accessToken}`
        axios.request(error?.response)
      })
    }
    return Promise.reject(error)
  })

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    // config.headers['Access-Control-Allow-Origin'] = 'Origin'
    // config.headers['Access-C
    // ontrol-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
  }
  return config
})
