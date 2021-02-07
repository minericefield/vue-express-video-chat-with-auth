import urlJoin from 'url-join'

import { UserDoc } from '../models/User'
import UserController from './User'

import sendEmail from '../services/emailer'
import { simpleTextEncrypt, simpleTextDecrypt } from '../services/simpleCrypto'

export default class AuthController extends UserController {
  constructor () {
    super()
  }

  public isUserActive (userId: string): Promise<UserDoc> {
    return new Promise ((resolve, reject) => {
      this.model.findOne({ _id: userId, status: 'active' }, null, null, (error, userDoc) => {    
        if (error || !userDoc) {
          return reject(error)
        }
    
        resolve(userDoc)
      })
    })
  }

  public async register (user: Partial<UserDoc>): Promise<UserDoc> {
    const userDoc = await this.create(user)
    await this.sendVerifyEmail(userDoc)
    return userDoc
  }

  private async sendVerifyEmail (user: UserDoc) {
    const encryptedUserId = simpleTextEncrypt(user._id.toString())
    const content = `<a href="${urlJoin(process.env.HOST, 'verify', encryptedUserId)}"> Please verify your account from this link. </a>`

    await sendEmail(user.email, 'Thank you for register!', content)
  }

  public async verify (userHash: string) {
    const userId = await this.update(simpleTextDecrypt(userHash), { status: 'active' })
    return userId
  }
}
