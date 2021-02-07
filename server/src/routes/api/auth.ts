import express, { Request, Response } from 'express'

import AuthController from '../../controllers/Auth'

const authController = new AuthController()

export const authRouter = express.Router()

authRouter.get('/api/auth', async (req: Request, res: Response) => {
  try {
    await authController.isUserActive(req.session.userId)
    res.json()
  } catch (error) {
    res.status(500).json({ someError: '' })
  }
})

authRouter.post('/api/auth', async (req: Request, res: Response) => {
  try {
    await authController.register(req.body)
    res.json()
  } catch (error) {
    console.log(error)
    res.status(500).json({ someError: '' })
  }
})
