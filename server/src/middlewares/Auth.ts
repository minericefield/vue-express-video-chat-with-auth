import { Request, Response, NextFunction } from 'express'

import AuthController from '../controllers/Auth'

const authController = new AuthController()

export const redirectLoginWhenNotRegistered = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.isUserActive(req.session.userId)
    next()
  } catch (error) {
    res.redirect('/login')
  }
}

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await authController.verify(req.params.userHash)
    req.session.userId = userId
    next()
  } catch (error) {
    res.redirect('/register')
  }
}
