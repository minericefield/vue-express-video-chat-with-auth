import express, { Request, Response } from 'express'

import UserController from '../../controllers/User'

const userController = new UserController()

export const userRouter = express.Router()

userRouter.put('/api/user', async (req: Request, res: Response) => {
  try {
    const userDoc = await userController.updateProfile(req.session.userId, req.body)
    res.json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email
    })
  } catch (error) {
    res.status(500).json()
  }
})
