import axios from 'axios'
import { API_BASE_URL, API_APP_URL, AUTH } from '@/constants'

const mainAxios = axios.create({
  baseURL: API_BASE_URL,
})

const altAxios = axios.create({
  baseURL: API_APP_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(`${AUTH.username}:${AUTH.password}`)}`,
  },
})

axios.defaults.withCredentials = true

export {
  mainAxios,
  altAxios,
}
