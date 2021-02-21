const Router=require('koa-router')

const userRouter=new Router()

const {
  register,
  login
} =require('../control/user')


userRouter.post('/register',register)

userRouter.post('/login' ,login)

module.exports=userRouter