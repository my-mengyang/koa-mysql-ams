const Router = require('koa-router')

const userRouter = new Router()

const {
  register,
  login,
  check
} = require('../control/user')


userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get("/checkName", check)

module.exports = userRouter