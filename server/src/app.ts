import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import csrf from 'csurf'
import connectRedis from 'connect-redis'
import redis from 'redis'
import noCache from 'nocache'

import { header } from './middlewares/'
import { Renderers, Api } from './routes'

const app = express()

// app.disable('x-powered-by')
// app.disable('etag')
app.use(header)

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

// app.use(helmet.hidePoweredBy())
app.use(noCache())

app.use(csrf({ cookie: false }))

const staticDir = path.resolve(__dirname, 'public')

app.use(Renderers(staticDir))
app.use(Api.authRouter)
app.use(Api.userRouter)

app.use(express.static(staticDir, { index: 'none', etag: false })) // disable default static index.html to handle rewriting index.html on top root

export default app
