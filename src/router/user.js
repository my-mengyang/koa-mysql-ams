const Router = require('koa-router')

const userRouter = new Router()

const {
  register,
  login,
  check,
  getUserInfo
} = require('../control/user')


userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get("/checkName", check)

userRouter.get("/getUserInfo",getUserInfo)

module.exports = userRouter