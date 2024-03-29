import app from './app'

import { connect } from './db'
import { init as initChannels } from './services/channels'
import deletePendingUserBatch from './services/deletePendingUser'

connect(process.env.DB_NAME)

const server = app.listen(3000, ()=>{
  console.log('!!! Server listening on port 3000 !!!')    
})

initChannels(server)

deletePendingUserBatch()

process.on('uncaughtException', (error) => {
  console.log('uncaughtException', error)
})
