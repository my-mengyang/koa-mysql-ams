const userService=require('../service/user')
const axios=require('axios')
const dayjs=require('dayjs')

const {decrypt} =require('../utils')
class UserControl {
  async register(ctx, next) {
    const user=ctx.request.body
    console.log(user)
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
    console.log(query.user_id)
    const res=await userService.getUserInfoById(query.user_id)
    ctx.body={
      success:true,
      data:res
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
