import { Response, NextFunction } from 'express'

export const header = (_, res: Response, next: NextFunction) => {
  res.removeHeader('X-Powered-By')
  res.removeHeader('ETag')
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','))
  res.header('no-cache', 'Set-Cookie')

  next()
}
