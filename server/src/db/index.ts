import mongoose from 'mongoose'

export const connect = (dbName: string): void => {
  mongoose.connect(`mongodb://${process.env.DB_AUTH_NAME}:${process.env.DB_AUTH_PASSWORD}@${process.env.DB_HOST}:27017/${dbName}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true })
}

// export const close = mongoose.connection.close
export const close = () => { mongoose.connection.close() }
