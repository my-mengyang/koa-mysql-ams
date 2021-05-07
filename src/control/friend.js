const FriendService =require("../service/friend")


class FriendControl{
  //添加友链
  async addFriend(ctx,next){
    const params =ctx.request.body
    const res=await FriendService.addFriend(params)
    ctx.body={
      success:true,
      data:res
    }

  }
}

module.exports=new FriendControl()