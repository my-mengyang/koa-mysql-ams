const connections=require('./index')

class UserManageService{
  async list(user){
    const {start,limit,nopage,name,start_time,end_time}=user
    console.log(nopage);
    console.log(typeof nopage);
    let  statement=`SELECT * FROM user`
    if (nopage === '0') {
      statement+=` LIMIT ${start*limit},${limit}`
    }
    if (name) {
      statement+=` WHERE username =${name}`
    }
    if (start_time) {
      statement+=`WHERE registerTime BETWEEN ${start_time} AND ${end_time}`
    }
    const res=await connections.execute(statement)
    return res[0]
  }
}

module.exports=new UserManageService()