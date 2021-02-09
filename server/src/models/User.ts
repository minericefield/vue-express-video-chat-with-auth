import bcrypt from 'bcrypt'
import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type UserDoc = {
  name: string;
  password: string;
  email: string;
  status: string;
  created: Date;
  updated: Date;
} & Document<string>

const Schema = mongoose.Schema

const UserSchema = new Schema({  
  name: { 
    type: String,
    required: [true, 'Please provide username']
  },
  password: {
    type: String,
    required: [true,'Please provide password']
  },
  email: {
    type: String,
    required: [true,'Please provide email'],
    unique: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
})

UserSchema.plugin(uniqueValidator);

/**
 * https://github.com/Automattic/mongoose/issues/6725
 * https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
 * https://stackoverflow.com/questions/65163605/typescript-throws-compilation-error-in-mongoose-pre-hook-expected-1-arguments
 */
UserSchema.pre('save', function (next) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const user = this as any
  bcrypt.hash(user.password, 10,  (_, hash) => {
    user.password = hash 
    next()
  })
})

// do in here will effect verifying
// UserSchema.pre('updateOne', function (next) {
//   /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
//   const user = this as any
//   bcrypt.hash(user._update.$set.password, 10,  (_, hash) => { // I bet this is incorrect way     
//     user._update.$set.password = hash 
//     next()
//   })
// })

export default mongoose.model<UserDoc>('User', UserSchema)
