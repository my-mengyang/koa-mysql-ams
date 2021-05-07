const connections=require('./index')
const dayjs=require('dayjs')
const {tree} =require('../utils')

class LabelService{
  async checkRepeatName(query){
    const {name}=query
    const statement=`SELECT * FROM label WHERE name=? AND type =1`
    const res=await connections.execute(statement,[name])
    return res[0]
  }
  async addTagByName(query){
    const {type,name}=query
    let time=dayjs().unix()
    const statement=`INSERT INTO label (type,name,create_time) VALUES (?,?,?)`
    const res=await connections.execute(statement,[type,name,time])
    return res[0]
  }
  async getTagList(query){
    const {nopage,start,limit,name}=query
    let statement=`SELECT SQL_CALC_FOUND_ROWS id,name,type,create_time,group_count,parent_id FROM label WHERE type=1`
    if(name){
      statement+=` AND name LIKE '%${name}%'`
    }
    if(nopage === '0'){
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

  async checkDirectoryIsExist(query){
    const {name}=query
    const statement=`SELECT * FROM label WHERE name=? AND type =2`
    const res=await connections.execute(statement,[name])
    return res[0]
  }
  async addDirectory(query){
    let {name,type,parent_id}=query
    let time=dayjs().unix()
    if(!parent_id){
      parent_id=null
    }
    let statement=`INSERT INTO label (type,name,create_time,parent_id) VALUES (?,?,?,?)`
    const res=await connections.execute(statement,[type,name,time,parent_id])
    return res[0]
  }
  async getDirectoryList(query){
    const {nopage,start,limit,name}=query
    let statement=`SELECT SQL_CALC_FOUND_ROWS id,name,type,create_time,group_count,parent_id FROM label WHERE type =2`
    if(name){
      statement+=` AND name LIKE '%${name}%'`
    }
    if (nopage === '0'){
      statement+=` LIMIT ${start*limit},${limit}`
    }
    const res=await connections.execute(statement)
    let constSql=`SELECT FOUND_ROWS()`
    const countRes=await connections.execute(constSql)
    let treeData=tree(res[0])
    return {
      data:treeData,
      count:countRes[0][0]['FOUND_ROWS()']
    }
  }
}

module.exports =new LabelService()