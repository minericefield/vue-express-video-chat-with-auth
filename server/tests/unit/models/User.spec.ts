import { connect, close } from '../../../src/db/'

import UserModel from '../../../src/models/User'

beforeAll(() => {
  connect(`${process.env.DB_NAME}_test_model_user`) // should connect different DB per each test file, because they would be ran asynchronously
})

beforeEach(async () => {
  await UserModel.deleteMany({})
})

afterAll(async() => {
  await UserModel.collection.drop()
  await close()
})

describe('normalities', () => {
  it('user can be created by correct params', async () => {
    const UserDoc = await UserModel.create({ name: 'name', password: 'password', email: 'email@email.com' })
    expect(UserDoc).toBeTruthy
  })

  it('the number of created users are correct', async () => {
    await UserModel.create({ name: 'name', password: 'password', email: 'email1@email.com' })
    await UserModel.create({ name: 'name', password: 'password', email: 'email2@email.com' })
    const numberOfUsers = await new Promise((resolve, _) => {
      UserModel.find({}, (_, userDocs) => {
        resolve(userDocs.length)
      })
    })
    expect(numberOfUsers).toBe(2)
  })
})

describe('abnormalities', () => {
  it('user cannot be created by missing params', async () => {
    // https://github.com/facebook/jest/issues/3601
    await expect(UserModel.create({ name: 'name', password: 'password' })).rejects.toThrowError() 
  })

  it('user cannot be created by duplicated email address', async () => {
    await UserModel.create({ name: 'name', password: 'password', email: 'email@email.com' })
    await expect(UserModel.create({ name: 'name', password: 'password', email: 'email@email.com' })).rejects.toThrowError() 
  })
})
