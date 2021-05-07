const Router =require('koa-router')

const labelRouter=new Router({prefix:'/label'})


const {
  addTag,
  checkTag,
  tagList,
  addDirectory,
  checkDirectory,
  directoryList
}=require('../control/label')


labelRouter.post('/addTag',addTag)

labelRouter.get('/checkTag',checkTag)

labelRouter.post('/tagList',tagList)


labelRouter.post('/addDirectory',addDirectory)

labelRouter.get('/checkDirectory',checkDirectory)

labelRouter.post('/directoryList',directoryList)







module.exports=labelRouter