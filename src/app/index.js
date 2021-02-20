const Koa=require('koa')

const app=new Koa()

const userRouter=require('../router/user')

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())




module.exports=app