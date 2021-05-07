const userService=require('../service/user')
const axios=require('axios')
const dayjs=require('dayjs')

const {decrypt} =require('../utils')
class UserControl {
  async register(ctx, next) {
    const user=ctx.request.body
    const ip=await getIpInfo(ctx)
    const address=`${ip.result.ip} ${ip.result.ad_info.nation}${ip.result.ad_info.province}${ip.result.ad_info.city}${ip.result.ad_info.district}`
    const res=await userService.register(user,address)
    ctx.body = {
      success:true,
    };
  }
  async login(ctx,next){
    //1. 获取用户名
    const {name,password}=ctx.request.body
    //2. 判断用户是否存在
    const result =await userService.getUserByName(name)
    const user=result[0]
    if (!user) {
      ctx.body={
        success:false,
        message:'账号不存在！',
        errorCode:1000
      }
      return
    }
    //3. 判断密码和数据库中的是否一致
    if (decrypt(password) !== decrypt(user.password)) {
      ctx.body={
        success:false,
        message:'密码错误',
        errorCode:1001
      }
      return
    }
    const id=user.id
    let time=dayjs().unix()
    const ip=await getIpInfo(ctx)
    const address=`${ip.result.ip} ${ip.result.ad_info.nation}${ip.result.ad_info.province}${ip.result.ad_info.city}${ip.result.ad_info.district}`
    const res=await userService.upDtateUserInfo(id,time,address)
    ctx.body={
      success:true,
      data:res
    }
  }

  async check(ctx,next){
    const {name} =ctx.request.query
    const result =await userService.getUserByName(name)
    ctx.body={
      success:true,
      data:result
    }
  }
  async getUserInfo(ctx,next){
    const query=ctx.request.query
    const res=await userService.getUserInfoById(query.user_id)
    ctx.body={
      success:true,
      data:res
    }
  }
  async checkPassword(ctx,next){
    const query=ctx.request.query
    const res=await userService.chekPasswordPorper(query.user_id)
    //密码不一致
    if (decrypt(res[0].password) !== query.oldPassword) {
      ctx.body={
        success:false,
        message:'密码错误'
      }
      return
    }else{
      ctx.body={
        success:true
      }
    }
  }
  async repeatPassword(ctx,next){
    const query=ctx.request.query
    const res=await userService.chekPasswordPorper(query.user_id)
    //密码不一致
    if(decrypt(res[0].password) === query.newPassword){
      ctx.body={
        success:false,
        message:'密码不能和以前的密码重复'
      }
    }else{
      ctx.body={
        success:true
      }
    }
  }
  async updateUserPassword(ctx,next){
    const query =ctx.request.body
    const res=await userService.changePassword(query.user_id,query.newPassword)
    ctx.body={
      success:true
    }
  }

  async updateUserInfo(ctx,next){
    const query=ctx.request.body

    ctx.body={
      success:true
    }
  }
}

//腾讯得位置服务api获取id地址
const getIpInfo =async function(ctx){
  const ip=ctx.ip.split(":").pop()
  const res=await axios.get('https://apis.map.qq.com/ws/location/v1/ip',{
    params:{
      key:"QDWBZ-SH5KD-KA64W-POSPZ-RJLZ5-GEBCH",
      id:ip
    }
  })
  return res.data
}

module.exports = new UserControl();
