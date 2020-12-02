import request from 'request-promise-native'
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
  get: (endpoint: string) => {
    return request({
      uri: `${BASE_URL}${endpoint}`,
      method: 'GET',
      json: true,
      headers: setupHeaders()
    })
  },
  post: (endpoint: string, body: any) => {
    return request({
      uri: `${BASE_URL}${endpoint}`,
      method: 'POST',
      body,
      json: true,
      headers: setupHeaders()
    })
  },
  delete: (endpoint: string, body: any) => {
    return request({
      uri: `${BASE_URL}${endpoint}`,
      method: 'DELETE',
      body,
      json: true,
      headers: setupHeaders()
    })
  }
}

export default wrapper