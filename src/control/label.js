const LabelService=require('../service/label')

class LabelControl{
  async addTag(ctx,next){
    const query=ctx.request.body
    const res=await LabelService.addTagByName(query)
    ctx.body={
      success:true,
      data:res
    }
  }
  async checkTag(ctx,next){
    let query=ctx.request.query
    const res=await LabelService.checkRepeatName(query)
    ctx.body={
      success:true,
      data:res
    }

  }
  async tagList(ctx,next){
    const query=ctx.request.body
    const res=await LabelService.getTagList(query)
    ctx.body={
      success:true,
      data:res.data,
      count:res.count
    }
  }

  async addDirectory(ctx,next){
    const query=ctx.request.body
    const res=await LabelService.addDirectory(query)
    ctx.body={
      success:true,
      data:res
    }
  }
  async checkDirectory(ctx,next){
    let query=ctx.request.query
    const res=await LabelService.checkDirectoryIsExist(query)
    ctx.body={
      success:true,
      data:res
    }
  }
  async directoryList(ctx,next){
    const query=ctx.request.body
    const res=await LabelService.getDirectoryList(query)
    ctx.body={
      success:true,
      data:res.data,
      count:res.count
    }
  }
}


module.exports=new LabelControl()