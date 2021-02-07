import app from './app'

import { connect } from './db'

connect(process.env.DB_NAME)

app.listen(3000, ()=>{
  console.log('!!! Server listening on port 3000 !!!')    
})

process.on('uncaughtException', (error) => {
  console.log('uncaughtException', error)
})
