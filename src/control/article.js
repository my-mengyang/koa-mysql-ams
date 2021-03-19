class ArticleControl {
  async addArticle(ctx,next) {
    const query=ctx.request.body
    ctx.body={
      success:true
    }
  }
  async editArticle(ctx,next) {
    ctx.body={
      success:true
    }
  }
  async list(ctx, next) {
    ctx.body={
      success:true
    }
  }
}

module.exports=new ArticleControl()
