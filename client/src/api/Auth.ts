import { AxiosRequestConfig } from 'axios'

import { RegistrationRequest, LoginRequest, UserResponse } from '../types/swagger'

import BaseApi from './Base'

export default class AuthApi extends BaseApi {
  constructor(config?: AxiosRequestConfig) {
    super('auth', config)
  }

  public register (registrationRequest: RegistrationRequest) {
    return this.request<RegistrationRequest, undefined>({ url: '', method: 'POST', data: registrationRequest })
  }

  public isUserActive () {
    return this.request<undefined, UserResponse>({ url: '', method: 'GET' })
  }

  public login (loginRequest: LoginRequest) {
    return this.request<LoginRequest, UserResponse>({ url: '', method: 'PUT', data: loginRequest })
  }

  public logout () {
    return this.request<undefined, undefined>({ url: '', method: 'DELETE' })
  }
}
