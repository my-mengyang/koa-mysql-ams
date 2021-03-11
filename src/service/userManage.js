const connections=require('./index')

class UserManageService{
  async list(user){
    const {start,limit,nopage,name,start_time,end_time}=user
    let  statement=`SELECT * FROM user`
    
    if (name) {
      statement+=` WHERE name LIKE '%${name}%'`
    }
    if (start_time) {
      statement+=`WHERE registerTime BETWEEN ${start_time} AND ${end_time}`
    }
    if (nopage === '0') {
      statement+=` LIMIT ${start*limit},${limit}`
    }
    const res=await connections.execute(statement)
    return res[0]
  }
}

module.exports=new UserManageService()