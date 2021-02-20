const connections=require('./index')



class UserService{
  async register(user){
    const {name,password}=user
    const statement=`INSERT INFO user (name,password) VALUES(?,?)`
    const res=await connections.execute(statement,[name,password])
    return res
  }
}


module.exports=new UserService()