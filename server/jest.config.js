module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/tests/**/*.ts'],
  collectCoverage: false,
  errorOnDeprecated: true,
  testEnvironment: 'node' // https://mongoosejs.com/docs/jest.html
}
