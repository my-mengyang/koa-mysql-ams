const UserManageService=require('../service/userManage')
const CommonService=require('../service/common')

class UserManageContorl{
  async list(ctx,next){
    const user=ctx.request.body
    const res=await UserManageService.list(user)
    const res1=await CommonService.count('user')
    ctx.body={
      success:true,
      data:res,
      code:200,
      count:res1
    }
  }
}


module.exports=new UserManageContorl()