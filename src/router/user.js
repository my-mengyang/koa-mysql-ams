const Router = require('koa-router')

const userRouter = new Router()

const {
  register,
  login,
  check,
  getUserInfo,
  checkPassword,
  repeatPassword,
  updateUserPassword,
  updateUserInfo
} = require('../control/user')


userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get("/checkName", check)

userRouter.get("/getUserInfo",getUserInfo)

userRouter.get("/checkPassword",checkPassword)

userRouter.get("/repeatPassword",repeatPassword)

userRouter.post("/updateUserPassword",updateUserPassword)

userRouter.post("/updateUserInfo",updateUserInfo)

module.exports = userRouter