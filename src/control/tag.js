const TagService=require('../service/tag')
const CommonService=require('../service/common')


class TagControl{
  async checkTagName(ctx,next){
    const name =ctx.request.query
    console.log(name);
    const res=await TagService.checkTagName(name.name)
    ctx.body={
      success:true,
      data:res,
      code:200
    }
  }
  async add(ctx,next){
    const name =ctx.request.body
    console.log(name);
    const res=await TagService.addTag(name.name)
    console.log(res);
    ctx.body={
      success:true,
      data:res,
    }
  }
  async list(ctx,next){
    const query=ctx.request.body
    console.log(query);
    const res=await TagService.list(query)
    const count=await CommonService.count('tags')
    ctx.body={
      success:true,
      data:res,
      count:count
    }
  }
}

module.exports =new TagControl()