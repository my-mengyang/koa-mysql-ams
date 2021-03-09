const Router=require('koa-router')

const tagRouter =new Router({prefix:'/tag'})



const {
  checkTagName,
  add,
  list
}=require('../control/tag')

tagRouter.get('/checkTagName',checkTagName)

tagRouter.post('/add',add)



tagRouter.post('/list',list)






module.exports=tagRouter