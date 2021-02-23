const Router = require('koa-router')

const userManageRouter=new Router({prefix:'/userManage'})

const {list}=require('../control/userManage')

userManageRouter.post('/list',list)


module.exports=userManageRouter