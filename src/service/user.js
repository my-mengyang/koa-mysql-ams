const connections=require('./index')
const dayjs =require('dayjs')



class UserService{
  //注册
  async register(user,address){
    const {name,password}=user
    let time=dayjs().unix()
    const loginStatement=`INSERT INTO login (account,password) VALUES(?,?)`
    const statement=`INSERT INTO user (name,registerTime,updateTime,registerAddress,laseLoginTime,lastLoginAddress,user_id) VALUES(?,?,?,?,?,?,?)`
    const result=await connections.execute(loginStatement,[name,password])
    let user_id=result[0].insertId
    const res=await connections.execute(statement,[name,time,time,address,time,address,user_id])
    return res[0]
  }
  //用户是否存在
  async getUserByName(name){
    const statement=`SELECT * FROM login WHERE account =?;`
    const res=await connections.execute(statement,[name])
    return res [0]
  }
  //用户登录更新最后登录时间和登陆地
  async upDtateUserInfo(user_id,time,address){
    const statement=`UPDATE user SET lastLoginAddress=?,laseLoginTime=? WHERE user_id=?`
    const res=await connections.execute(statement,[address,time,user_id])
    console.log(res[0])
    return user_id
  }
  //获取用户信息
  async getUserInfoById(id){
    const statement=`SELECT * FROM user WHERE user_id = ?`
    const res=await connections.execute(statement,[id])
    console.log(res[0])
    return res[0][0]
  }
}


module.exports=new UserService()