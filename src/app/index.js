const Koa=require('koa')
const useRoutes=require('../router')

const app=new Koa()
const bodyParser=require('koa-bodyparser')
const multer=require('koa-multer')
const upload=multer({})

app.useRoutes=useRoutes

app.use(bodyParser())
app.use(upload.any())
app.useRoutes()




module.exports=app