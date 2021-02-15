import express, { Request, Response } from 'express'

import AuthController from '../../controllers/Auth'

const authController = new AuthController()

export const authRouter = express.Router()

authRouter.get('/api/auth', async (req: Request, res: Response) => {
  try {
    const userDoc = await authController.isUserActive(req.session.userId)
    res.json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email
    })
  } catch (error) {
    res.status(500).json()
  }
})

authRouter.post('/api/auth', async (req: Request, res: Response) => {
  try {
    await authController.register(req.body)
    res.json()
  } catch (error) {
    res.status(500).json()
  }
})

authRouter.put('/api/auth', async (req: Request, res: Response) => {
  try {
    const userDoc = await authController.login(req.body)
    req.session.userId = userDoc._id
    res.json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email
    })
  } catch (error) {
    res.status(500).json()
  }
})

authRouter.delete('/api/auth', async (req: Request, res: Response) => {
  req.session.userId = null
  res.json()
})
