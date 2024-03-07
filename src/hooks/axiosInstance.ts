import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://rof-investors-server.vercel.app',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  // validateStatus: () => true
})

export default axiosInstance
