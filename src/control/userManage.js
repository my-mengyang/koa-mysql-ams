const UserManageService=require('../service/userManage')

class UserManageContorl{
  async list(ctx,next){
    const user=ctx.request.body
    const res=await UserManageService.list(user)
    ctx.body={
      success:true,
      data:res.data,
      count:res.count
    }
  }
}


module.exports=new UserManageContorl()