import bcrypt from 'bcrypt'
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

  public async register (user: Partial<UserDoc>) {
    // TODO: email duplication error message https://stackoverflow.com/questions/38945608/custom-error-messages-with-mongoose
    const userDoc = await this.create(user)
    await this.sendVerifyEmail(userDoc)

    return userDoc
  }

  private async sendVerifyEmail (userDoc: UserDoc) {
    const encryptedUserId = simpleTextEncrypt(userDoc._id.toString())
    const content = `<a href="${urlJoin(process.env.HOST, 'verify', encryptedUserId)}"> Please verify your account from this link. </a>`
    await sendEmail(userDoc.email, 'Thank you for register!', content)

    return userDoc
  }

  public async verify (userHash: string) {
    const userId = await this.update(simpleTextDecrypt(userHash), { status: 'active' })

    return userId
  }

  public login ({ email, password }: { email: string, password: string }): Promise<UserDoc> {
    return new Promise ((resolve, reject) => {
      this.model.findOne({ email, status: 'active' }, null, null, (error, userDoc) => {    
        if (error || !userDoc) {
          return reject(error)
        }

        bcrypt.compare(password, userDoc.password, (error, isSame) =>{
          if(isSame){ 
            resolve(userDoc)
          } else {
            reject(error)
          }
        })
      })
    })
  }
}
