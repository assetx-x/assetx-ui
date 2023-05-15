import axios from 'axios'

const METHODS = ['get', 'put', 'post', 'patch', 'delete']

axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    if (error && error.response && error.response.status === 401) {
      // Logout
    }
    // eslint-disable-next-line no-undef
    return Promise.reject(error)
  },
)

export function setAccessToken(accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  return
}

export function getAccessToken() {
  return axios.defaults.headers.common.Authorization
}

export function getQuerystringFromParams(data = {}) {
  return Object.keys(data)
    .map(key => key + '=' + data[key])
    .join('&')
}

const httpMethods = METHODS.map(
  method =>
    (url, requestConfig = {}) =>
      axios.request({
        url,
        method,
        ...requestConfig,
      }),
)

export const [get, put, post, patch, del] = httpMethods