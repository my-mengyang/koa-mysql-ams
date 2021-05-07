const Router = require('koa-router')

const commonRouter = new Router()

const {
  countArticle,
  articleRead,
  commentCount,
  articlePraise
} = require("../control/common")

//多少篇文章
commonRouter.get("/common/countArticle", countArticle)


//文章阅读总量
commonRouter.get("/common/articleRead", articleRead)


//评论总数
commonRouter.get("/common/commentCount", commentCount)

//文章获赞
commonRouter.get("/common/articlePraise", articlePraise)

module.exports = commonRouter

