const userService=require('../service/user')

class UserControl {
  async register(ctx, next) {
    const user=ctx.request.body
    const res=await userService.register(user)
    console.log(res)
    ctx.body = {
      success:true,
      data:res.insertId,
      code:200
    };
  }
  async login(ctx,next){
    //1. 获取用户名
    const {name,password}=ctx.request.body
    //2. 判断用户是否存在
    const result =await userService.getUserByName(name)
    console.log(result)
    const user=result[0]
    console.log(user)
    if (!user) {
      ctx.body={
        success:false,
        message:'账号不存在！',
        errorCode:1000
      }
      return
    }
    //3. 判断密码和数据库中的是否一致
    if (password !== user.password) {
      ctx.body={
        success:false,
        message:'密码错误',
        errorCode:1001
      }
      return
    }
    ctx.body={
      success:true,
      data:user
    }
  }

  async check(ctx,next){
    const {name} =ctx.request.query
    const result =await userService.getUserByName(name)
    console.log(result)
    ctx.body={
      success:true,
      data:result
    }
  }
}

module.exports = new UserControl();
