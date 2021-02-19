const app=require('./src/app')
const connection=require('./src/service')
const config=require('./src/config')

app.listen(config.APP_PROT,()=>{
  console.log(`服务器在${config.APP_PORT}端口启动了`)
})