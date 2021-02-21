const connections=require('./index')



class UserService{
  //注册
  async register(user){
    const {name,password}=user
    const statement=`INSERT INTO user (name,password) VALUES(?,?)`
    const res=await connections.execute(statement,[name,password])
    return res[0]
  }
  //用户是否存在
  async getUserByName(name){
    const statement=`SELECT * FROM user WHERE name =?;`
    const res=await connections.execute(statement,[name])
    return res [0]
  }
}


module.exports=new UserService()