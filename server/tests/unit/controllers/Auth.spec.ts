import { connect, close } from '../../../src/db/'

import AuthController from '../../../src/controllers/Auth'
import UserModel from '../../../src/models/User'

beforeAll(() => {
  connect(`${process.env.DB_NAME}_test_controller_auth`)
})

beforeEach(async () => {
  await UserModel.deleteMany({})
})

afterAll(async() => {
  await UserModel.collection.drop()
  await close()
})

describe('normalities', () => {
  it('user can be registered by correct params', async () => {
    const UserDoc = await new AuthController().register({ name: 'name', password: 'password', email: 'email@email.com' })
    expect(UserDoc).toBeTruthy
  })
})

describe('abnormalities', () => {
  it('user could not be registered by incorrect email format', async () => {
    await expect(new AuthController().register({ name: 'name', password: 'password', email: 'email' })).rejects.toThrowError() 
  })
})
