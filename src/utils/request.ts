import request from 'request-promise-native'
import { BASE_URL } from './constants'

const wrapper = {
  get: (endpoint: string) => {
    return request({
      uri: `${BASE_URL}${endpoint}`,
      method: 'GET',
      json: true
    })
  },
  post: (endpoint: string, body: any) => {
    return request({
      uri: `${BASE_URL}${endpoint}`,
      method: 'POST',
      body,
      json: true
    })
  }
}

export default wrapper