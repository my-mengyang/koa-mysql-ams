const DirectoryService=require('../service/directory')


class DirectoryControl{
  async checkDirectory(ctx,next){
    const name=ctx.request.query
    console.log(name);
    const res=await DirectoryService.checkName(name.name)
    ctx.body={
      success:true,
      data:res
    }  
  }

  async add(ctx,next){
    const query=ctx.request.body
    console.log(query);
    const res=await DirectoryService.add(query)
    console.log(res);
    ctx.body={
      success:true,
      data:res
    }
  }

  

  async list(ctx,next){
    const params=ctx.request.body
    const res=await DirectoryService.list(params)
    ctx.body={
      success:true,
      data:res
    }
  }
}

module.exports=new DirectoryControl()