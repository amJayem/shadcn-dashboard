import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  // validateStatus: () => true
})

export default axiosInstance
