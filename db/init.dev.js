// https://stackoverflow.com/questions/5916080/what-are-naming-conventions-for-mongodb

db.createUser({
  user: "admin",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "vue-express-video-chat"
    }
  ]
})
