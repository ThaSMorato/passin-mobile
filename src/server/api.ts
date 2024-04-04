import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.1.105:3131',
})

export const EVENT_ID = 'f690bda8-f172-4c13-99a7-6b448df03bca'
