import express, { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'

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

    doc = doc.replace(
      '<meta name="csrf-token" content="">', 
      `<meta name="csrf-token" content="${req.csrfToken()}">`
    )
    res.send(doc)
  }

  initializeDoc()

  router.get('/', render)
  router.get('/communication/:communicationHash', render)
  router.get('/login', render)
  router.get('/register', render)
  router.get('/verify/:userHash', render)
  router.get('/me', render)

  return router
}

// maybe instance method is bad idea for middleware because it have to use with bind...? (context of this depends on it's running context)
// export class Renderers {
//   private doc: string
//   public router: Router

//   constructor (staticDir: string) {
//     this.initializeRoutes()
//     this.initializeDoc(staticDir)
//   }

//   private initializeRoutes (): void {
//     this.router = express.Router()

//     this.router.get('/', this.render)
//   }

//   private async initializeDoc (staticDir: string) {
//     try {
//       const docPath = path.join(staticDir, 'index.html')
//       this.doc = await fs.readFile(docPath, 'utf-8')
//     } catch (error) {
//       // only for the first build or volume down of public
//       this.doc = 'building now'
//     }
//   }

//   private render (req: Request, res: Response) {
//     this.doc = this.doc.replace(
//       '<meta name="csrf-token" content="">', 
//       `<meta name="csrf-token" content="${req.csrfToken()}">`
//     )
//     res.send(this.doc)
//   }
// }
