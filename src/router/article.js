const Router=require('koa-router')

const articleRouter=new Router({prefix:'/article'})


const {
  addArticle,
  editArticle,
  list
} =require('../control/article')


articleRouter.post('/add',addArticle)

articleRouter.post('/edit',editArticle)


articleRouter.post('/list',list)

module.exports=articleRouter