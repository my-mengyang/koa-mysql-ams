const Router=require('koa-router')

const directoryRouter=new Router({prefix:'/directory'})

const {
  add,
  checkDirectory,
  list
} =require('../control/directory')

directoryRouter.get('/checkDirectory',checkDirectory)

directoryRouter.post('/add',add)

directoryRouter.post('/list',list)



module.exports=directoryRouter