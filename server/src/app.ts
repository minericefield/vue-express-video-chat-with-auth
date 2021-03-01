import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import csrf from 'csurf'
import connectRedis from 'connect-redis'
import redis from 'redis'
import helmet from 'helmet'
import noCache from 'nocache'

import { Renderers, Api } from './routes'

const app = express()

const RedisStore = connectRedis(expressSession)
const redisClient = redis.createClient(6379, process.env.REDIS_HOST, {
  prefix: process.env.REDIS_PREFIX
})

app.use(cookieParser())
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  cookie: {
    maxAge: 24 * 60 * 60 * 100 * 100,
    secure: false,
    sameSite: 'strict'
  },
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  store: new RedisStore({
    client: redisClient
  })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.use(helmet.hidePoweredBy())
app.use(noCache())

/**
 * https://github.com/expressjs/csurf/issues/193
 * NOTE: maybe trust proxy needed or even with trust proxy, doesn't work
 */
app.use(csrf({ cookie: false }))

const staticDir = path.resolve(__dirname, 'client')
app.use(express.static(staticDir, { index: 'none' })) // disable default static index.html to handle rewriting index.html on top root

app.use(Renderers(staticDir))
app.use(Api.authRouter)
app.use(Api.userRouter)

export default app
