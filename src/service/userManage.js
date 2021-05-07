const connections=require('./index')
const dayjs =require('dayjs')

class UserManageService{
  async list(user){
    const {start,limit,nopage,name,start_time,end_time}=user
    let  statement=`SELECT SQL_CALC_FOUND_ROWS * FROM user WHERE \`deleted\` = 0 AND registerTime BETWEEN ${start_time||0} AND ${end_time||dayjs().unix()}`
    
    if (name) {
      statement+=` AND name LIKE '%${name}%'`
    }
    // if (start_time) {
    //   statement+=`WHERE registerTime BETWEEN ${start_time} AND ${end_time}`
    // }
    if (nopage === '0') {
      statement+=` LIMIT ${start*limit},${limit}`
    }
    const res=await connections.execute(statement)
    let constSql=`SELECT FOUND_ROWS()`
    const countRes=await connections.execute(constSql)
    return {
      data:res[0],
      count:countRes[0][0]['FOUND_ROWS()']
    }
  }
  async deleted(id){
    const statement=`UPDATE user SET \`deleted\` =1 WHERE id=${id}`
    const res=connections.execute(statement)
    return res[0]
  }
}

module.exports=new UserManageService()