import crypto from 'crypto' // node

const algorithm = 'aes-256-ctr'
const iv = crypto.randomBytes(16) // !static

export const simpleTextEncrypt = (str: string) => {
  const cipher = crypto.createCipheriv(algorithm, process.env.CRYPTO_PASSWORD, iv)
  return Buffer.concat([cipher.update(str), cipher.final()]).toString('hex')
}

export const simpleTextDecrypt = (str: string) => {
  const decipher = crypto.createDecipheriv(algorithm, process.env.CRYPTO_PASSWORD, Buffer.from(iv.toString('hex'), 'hex'))
  return Buffer.concat([decipher.update(Buffer.from(str, 'hex')), decipher.final()]).toString()
}
