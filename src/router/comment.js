const Router=require('koa-router')

const commentRouter=new Router()

const {
  addComment,
  list,
  EditCommentById,
  pariseAdd
} =require("../control/comment")

//前台接口
commentRouter.post("/comment/addComment",addComment)

//评论列表
commentRouter.post("/comment/list",list)

//评论点赞加一
commentRouter.post("/comment/pariseAdd",pariseAdd)


//后台接口

commentRouter.post("/comment/EditCommentById",EditCommentById)







module.exports =commentRouter