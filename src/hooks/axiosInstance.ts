import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000', //process.env.API_BASE_URL as string,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  // validateStatus: () => true
})

export default axiosInstance
