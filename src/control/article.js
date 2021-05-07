const ArticleService =require('../service/article')

class ArticleControl {
  async addArticle(ctx,next) {
    const query=ctx.request.body
    const res=await ArticleService.addArticle(query)
    ctx.body={
      success:true,
      data:res
    }
  }
  async editArticle(ctx,next) {
    ctx.body={
      success:true
    }
  }
  async list(ctx, next) {
    const query=ctx.request.body
    const res=await ArticleService.articleList(query)
    ctx.body={
      success:true,
      data:res.data,
      count:res.count
    }
  }

  async eachDetail(ctx,next){
    const query=ctx.request.query
    const res=await ArticleService.getArticleDetailByArticleId(query)
    ctx.body={
      success:true,
      data:res.data
    }
  }

  async editStatus(ctx,next){
    const query =ctx.request.body
    const res=await ArticleService.setStatusById(query)
    ctx.body={
      success:true,
      data:res
    }
  }

  async likeSomeArticle(ctx,next){
    const query=ctx.request.body
    const res=await ArticleService.setPraiseById(query)
    ctx.body={
      success:true
    }
  }

  async updateArticleAred(ctx,next){
    const query =ctx.request.body
    const res=await ArticleService.updateReadById(query)
    ctx.body={
      success:true
    }
  }

  async hotArticle(ctx,nuxt){

    const query=ctx.request.body
    console.log(query)
    const res=await ArticleService.hotArticle(query)
    ctx.body={
      success:true,
      data:res
    }
  }

}

module.exports=new ArticleControl()
