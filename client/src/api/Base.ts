import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, CancelTokenSource, Method } from 'axios'
import urlJoin from 'url-join'

type Response <T> = {
  succeed: boolean;
  canceled: boolean;
} & AxiosResponse<T>

export default class BaseApi {
  private config = {
    withCredentials: true,
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': document.querySelector<HTMLElement>('meta[name="csrf-token"]')?.getAttribute('content') // https://github.com/expressjs/csurf
    }
  }

  protected axios: AxiosInstance

  private cancelTokenSources: { [key: string]: CancelTokenSource } = {}

  constructor (url: string, config?: AxiosRequestConfig) {
    this.config.baseURL = urlJoin(this.config.baseURL, url)

    if (config) {
      this.config = {
        ...this.config,
        ...config
      }
    }

    this.axios = axios.create(this.config)
  }

  protected async request <T, U> ({ url, method, data }: { url: string; method: Method; data?: T }) {
    let response: Response<U>

    try {
      if (method.toLocaleLowerCase() === 'get') {
        response = await this.axios.request({ url, method, params: data })
      } else {
        response = await this.axios.request({ url, method, data })
      }
    } catch (error) { // type :AxiosError
       response = error.response
    }

    if (response.status < 300) {
      response.succeed = true
    } else {
      response.succeed = false
    }

    return response
  }

  protected async requestCancelable <T, U> ({ url, method, data, key }: { url?: string; method: 'GET' | 'get'; key: string; data?: T }) {
    if (this.cancelTokenSources[key]) {
      this.cancelTokenSources[key].cancel()
    }
    this.cancelTokenSources[key] = axios.CancelToken.source()

    let response!: Response<U>

    try {
      response = await this.axios.request({ url, method, params: data })
    } catch (error) { // type :AxiosError
      if (axios.isCancel(error)) {
        response.status = 999
        response.canceled = true
      } else {
        response = error.response
      }
    }

    if (response.status < 300) {
      response.succeed = true
    } else {
      response.succeed = false
    }

    delete this.cancelTokenSources[key]

    return response
  }
}
