const Router=require('koa-router')

const userRouter=new Router()


const {
  login
}=require('../control/user')

userRouter.post('/login',login)


module.exports=userRouter