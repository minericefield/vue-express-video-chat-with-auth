import express, { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'

import {
  redirectLoginWhenNotRegistered,
  verify
} from '../../middlewares/Auth'

export const Renderers = (staticDir: string) => {
  const buildingMessage = 'building now...'
  let doc = ''
  const router = express.Router()

  const initializeDoc = async () => {
    try {
      const docPath = path.join(staticDir, 'index.html')
      doc = await fs.readFile(docPath, 'utf-8')
    } catch (error) {
      // only for the first build or volume down of public
      doc = buildingMessage
    }
  }

  const render = async (req: Request, res: Response) => {
    if (doc === buildingMessage) await initializeDoc()

    const generatedDoc = doc.replace(
      `<meta name="csrf-token" content="">`, 
      `<meta name="csrf-token" content="${req.csrfToken()}">`
    )
    res.send(generatedDoc)
  }

  initializeDoc()

  router.get('/', redirectLoginWhenNotRegistered, render)
  router.get('/communication/:channelName', redirectLoginWhenNotRegistered, render)
  router.get('/login', render)
  router.get('/register', render)
  router.get('/verify/:userHash', verify, render)
  router.get('/me', redirectLoginWhenNotRegistered, render)

  return router
}
