const Router=require('koa-router')

const friendRouter=new Router()

const {
  addFriend
} =require("../control/friend")


//前台



//后台
friendRouter.post("/friend/addFriend",addFriend)


module.exports=friendRouter