import { AxiosRequestConfig} from 'axios'

import { RegistrationRequest, LoginRequest } from '../types/swagger'

import BaseApi from './Base'

export default class AuthApi extends BaseApi {
  constructor(config?: AxiosRequestConfig) {
    super('auth', config)
  }

  public register (registrationRequest: RegistrationRequest) {
    return this.request<RegistrationRequest>({ url: '', method: 'POST', data: registrationRequest })
  }

  public isUserActive () {
    return this.request({ url: '', method: 'GET' })
  }

  public login (loginRequest: LoginRequest) {
    return this.request<LoginRequest>({ url: '', method: 'PUT', data: loginRequest })
  }
}
