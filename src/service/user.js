const connections=require('./index')
const dayjs =require('dayjs')



class UserService{
  //注册
  async register(user,address){
    const {name,password}=user
    let time=dayjs().unix()
    const statement=`INSERT INTO user (name,password,username,registerTime,updateTime,registerAddress,lastLoginAddress) VALUES(?,?,?,?,?,?,?)`
    const res=await connections.execute(statement,[name,password,name,time,time,address,address])
    return res[0]
  }
  //用户是否存在
  async getUserByName(name){
    const statement=`SELECT * FROM user WHERE name =?;`
    const res=await connections.execute(statement,[name])
    return res [0]
  }
  async upDtateUserInfo(time,address){
    const statement=`UPDATE user SET lastLoginAddress=${address},laseLoginTime=${time} WHERE `
  }
}


module.exports=new UserService()