const connections=require('./index')
const dayjs=require('dayjs')

class TagService{
  async checkTagName(name){
    const statement=`SELECT * FROM tags WHERE name =?`
    const res=await connections.execute(statement,[name])
    console.log(res);
    return res[0]
  }
  async addTag(name){
    let time=dayjs().unix()
    const statement=`INSERT INTO tags (name,create_time) VALUES(?,?)`
    const res=await connections.execute(statement,[name,time])
    return res[0]

  }
  async list(query){
  const {nopage,start,limit,name}=query
    let statement=`SELECT * FROM tags`
    if(nopage === '0'){
      statement+=` LIMIT ${start*limit},${limit}`
    }
    if(name){
      statement+=` WHERE name =${name}`
    }
    const res=await connections.execute(statement)
    return res[0]
  }
}


module.exports=new TagService()