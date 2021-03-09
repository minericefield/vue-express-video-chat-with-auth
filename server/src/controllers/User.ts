import bcrypt from 'bcrypt'

import UserModel, { UserDoc } from '../models/User'
import BaseController from './Base'

export default class UserController extends BaseController <UserDoc> {
  constructor () {
    super(UserModel)
  }

  public async updateProfile (userId: string, user: Partial<UserDoc>) {
    const hash = await new Promise<string>(resolve => {
      bcrypt.hash(user.password, 10,  (_, hash) => {      
        resolve(hash)
      })
    })

    user.password = hash
    await this.update(userId, user)
    const userDoc = await this.show(userId)
    return userDoc
  }
}
