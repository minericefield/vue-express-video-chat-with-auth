import cron from 'node-cron'

import User from '../models/User'

export default () => {
  cron.schedule('59 59 23 * * *', () => {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)

    return User.find({ status: 'pending', created: { $lt: yesterday } }, (error, users) => {
      if (!error && users) {
        const ids = users.map((user) => user._id)
        User.deleteMany({ _id: { $in: ids } }, null, () => {
          //
        })
      }
    })
  })
}
