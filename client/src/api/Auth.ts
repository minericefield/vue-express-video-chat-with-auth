import { AxiosRequestConfig} from 'axios'

import { RegistrationRequest } from '../types/swagger'

import BaseApi from './Base'

export default class AuthApi extends BaseApi {
  constructor(config?: AxiosRequestConfig) {
    super('auth', config)
  }

  public register (registrationRequest: RegistrationRequest) {
    return this.request<RegistrationRequest>({ url: '', method: 'post', data: registrationRequest })
  }

  public isUserActive () {
    return this.request({ url: '', method: 'get' })
  }
}
