import axios from 'axios'
import { BASE_URL } from './constants'

const setupHeaders = () => {
  const authToken = localStorage.getItem('andicarAuthToken')
  return authToken ? { authToken } : {}
}

const wrapper = {
  setAuthToken: (token: string) => {
    localStorage.setItem('andicarAuthToken', token)
  },
  removeAuthToken: () => {
    localStorage.removeItem('andicarAuthToken')
  },
  get: async (endpoint: string) => {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method: 'get',
      headers: setupHeaders()
    })
    return response.data
  },
  post: async (endpoint: string, body: any) => {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method: 'post',
      data: body,
      headers: setupHeaders()
    })
    return response.data
  },
  put: async (endpoint: string, body: any) => {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method: 'put',
      data: body,
      headers: setupHeaders()
    })
    return response.data
  },
  delete: async (endpoint: string, body: any) => {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method: 'delete',
      data: body,
      headers: setupHeaders()
    })
    return response.data
  },
  getErrorBody: (error: any) => {
    return (error && error.response && error.response.data && error.response.data.data) || {}
  }
}

export default wrapper