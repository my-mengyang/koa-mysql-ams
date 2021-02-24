const connections=require('./index')

class UserManageService{
  async list(user){
    const {start,limit,pagination,name,start_time,end_time}=user
    let  statement=`SELECT * FROM user`
    if (pagination === '1') {
      statement+=` LIMIT ${start*limit},${limit}`
    }
    if (name) {
      statement+=` WHERE username =name`
    }
    if (start_time) {
      statement+=`WHERE registerTime BETWEEN ${start_time} AND ${end_time}`
    }
    console.log(statement)
    const res=await connections.execute(statement)
    return res[0]
  }
}

module.exports=new UserManageService()