const connections=require('./index')
const dayjs=require('dayjs')

class DirectoryService{
  //校验目录名是否存在
  async checkName(name){
    const statement=`SELECT * FROM directory WHERE name=?`
    const res=await connections.execute(statement,[name])
    return res[0]
  }
  //添加用目录名
  async add(query){
    let {name,parent_id}=query
    if (!parent_id) {
      parent_id=null
    }
    let time =dayjs().unix()
    const statement=`INSERT INTO directory (name,create_time,parent_id) VALUES(?,?,?)`
    const res=await connections.execute(statement,[name,time,parent_id])
    return res[0]
  }
  //目录列表
  async list(query){
    const {nopage,start,limit,name}=query
    let statement=`SELECT * FROM directory`
    if (nopage === '0') {
      statement+=` LIMIT ${start*limit},${limit}`
    }
    if(name){
      statement +=` WHERE name=${name}`
    }
    const res=await connections.execute(statement)
    return res[0]
  }
}

module.exports=new DirectoryService()