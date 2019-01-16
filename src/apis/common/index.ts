import axios, { AxiosRequestConfig } from 'axios'

// const TOKEN = ''
const instance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  // headers: { Authorization: `token ${TOKEN}` },
})
function request<T>(config: AxiosRequestConfig) {
  return instance.request<T>(config).then((res) => res.data)
}

export default request
