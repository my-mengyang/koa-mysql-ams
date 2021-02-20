const service=require('../service/user')

class UserControl {
  async register(ctx, next) {
    console.log(11111111111);
    console.log(ctx)
    const user=ctx.request.body
    const res=await service.register(user)
    ctx.body = "这是添加了control";
  }
}

module.exports = new UserControl();
