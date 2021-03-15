const Router = require('koa-router')

const userManageRouter=new Router({prefix:'/userManage'})

const {list,deleted}=require('../control/userManage')

userManageRouter.post('/list',list)

userManageRouter.post('/deleted',deleted)


module.exports=userManageRouter