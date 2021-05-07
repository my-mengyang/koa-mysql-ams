const Router=require('koa-router')

const articleRouter=new Router({prefix:'/article'})


const {
  addArticle,
  editArticle,
  list,
  eachDetail,
  editStatus,
  likeSomeArticle,
  updateArticleAred,
  hotArticle
} =require('../control/article')


articleRouter.post('/add',addArticle)

articleRouter.post('/edit',editArticle)


articleRouter.post('/list',list)

//修改文章的状态
articleRouter.post("/editArticle",editStatus)

//前台根据id获取文章详情
articleRouter.get("/eachDetail",eachDetail)

//前台点赞某一篇文章
articleRouter.post("/likeSomeArticle",likeSomeArticle)

//前台文章阅读量更新
articleRouter.post("/updateArticleAred",updateArticleAred)

//热门文章
articleRouter.post("/hotArticle",hotArticle)

module.exports=articleRouter