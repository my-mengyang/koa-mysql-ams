const CommentService=require("../service/comment")


class CommentControl{
  async addComment(ctx,next){
    const query=ctx.request.body
    const res=await CommentService.addComment(query)
    ctx.body={
      success:true,
      data:res
    }

  }
  async list(ctx,next){
   const query=ctx.request.body
    const res=await CommentService.list(query)
    ctx.body={
     success:true,
      data:res.data,
      total:res.total
    }
  }

  async EditCommentById(ctx,next){
    const query=ctx.request.body
    const res=await CommentService.editComment(query)
    ctx.body={
      success:true,
      data:res
    }
  }

  async pariseAdd(ctx,nuxt){
    const query=ctx.request.body
    const res=await CommentService.pariseAdd(query)
    ctx.body={
      success:true,
      data:res
    }
  }
}

module.exports =new CommentControl()