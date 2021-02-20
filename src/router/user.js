const Router=require('koa-router')

const userRouter=new Router()

const {
  register
} =require('../control/user')

userRouter.post('/register',register)

module.exports=userRouter