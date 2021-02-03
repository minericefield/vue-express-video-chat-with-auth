import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'

const app = express()

const RedisStore = connectRedis(expressSession)
const redisClient = redis.createClient(6379, process.env.REDIS_HOST, {
  prefix: process.env.REDIS_PREFIX
})

app.use(cookieParser())
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 100 * 100,
    secure: false, // TODO: activate secure on production maybe
    sameSite: 'strict'
  },
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  store: new RedisStore({
    client: redisClient
  })
}))

const staticDir = path.resolve(__dirname, 'public')
app.use(express.static(staticDir))

export default app
