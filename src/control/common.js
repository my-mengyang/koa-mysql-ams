const CommonService=require("../service/common")

class CommonControl{
  async countArticle(ctx,next){
    const params=ctx.request.query
    const res=await CommonService.obtainArticleCount()
    ctx.body={
      success:true,
      data:res
    }
  }

  async articleRead(ctx,next){
    const params=ctx.request.query
    const res=await CommonService.obtainArticleRead()
    ctx.body={
      success:true,
      data:res
    }
  }

  async commentCount(ctx,next){
    const params=ctx.request.query
    const res=await CommonService.obtainCommentCount()
    ctx.body={
      success:true,
      data:res
    }
  }

  async articlePraise(ctx,next){
    const params=ctx.request.query
    const res=await CommonService.obtainArticlePraise()
    ctx.body={
      success:true,
      data:res
    }
  }
}

module.exports = new CommonControl()