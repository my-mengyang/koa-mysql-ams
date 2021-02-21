const Koa=require('koa')

const app=new Koa()
const bodyParser=require('koa-bodyparser')
const multer=require('koa-multer')
const upload=multer({})

const userRouter=require('../router/user')

app.use(bodyParser())
app.use(upload.any())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())




module.exports=app