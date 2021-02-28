import { connect, close } from '../../../src/db/'

import UserController from '../../../src/controllers/User'
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
  it('user can be updated if it exists', async () => {
    const userDoc = await UserModel.create({ name: 'name', password: 'password', email: 'email@email.com' })
    const updateUserDoc = await new UserController().updateProfile(userDoc._id, { name: 'namename', password: 'passwordpassword', email: 'emailemail@email.com' })
    expect(updateUserDoc).toBeTruthy
  })
})

describe('abnormalities', () => {
  it('user can not be updated if it does not exist', async () => {
    await expect(new UserController().updateProfile('xyz', { name: 'namename', password: 'passwordpassword', email: 'emailemail@email.com' })).rejects.toThrowError() 
  })
})
