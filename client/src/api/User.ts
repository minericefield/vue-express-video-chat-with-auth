import { AxiosRequestConfig } from 'axios'

import { RegistrationRequest, UserResponse } from '../types/swagger'

import BaseApi from './Base'

export default class UserApi extends BaseApi {
  constructor(config?: AxiosRequestConfig) {
    super('user', config)
  }

  public update (registrationRequest: RegistrationRequest) {
    return this.request<RegistrationRequest, UserResponse>({ url: '', method: 'PUT', data: registrationRequest })
  }

  public delete () {
    return this.request<undefined, undefined>({ url: '', method: 'DELETE' })
  }
}
