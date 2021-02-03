import express from 'express'
import path from 'path'

const app = express()

const staticDir = path.resolve(__dirname, 'public')
app.use(express.static(staticDir))

export default app
