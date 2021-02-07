import UserModel, { UserDoc } from '../models/User'
import BaseController from './Base'

export default class UserController extends BaseController <UserDoc> {
  constructor () {
    super(UserModel)
  }
}
