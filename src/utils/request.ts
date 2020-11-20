import request from 'request-promise-native'
import { BASE_URL } from './constants'

const setupHeaders = () => {
  const authToken = sessionStorage.getItem('authToken')
  return authToken ? { authToken } : {}
}

const wrapper = {
  setAuthToken: (token: string) => {
    sessionStorage.setItem('authToken', token)
  },
  removeAuthToken: () => {
    sessionStorage.removeItem('authToken')
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
  }
}

export default wrapper