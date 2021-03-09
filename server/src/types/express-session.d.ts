import 'express-session'

declare module 'express-session' {
  export interface Session {
    userId: string
  }
}
