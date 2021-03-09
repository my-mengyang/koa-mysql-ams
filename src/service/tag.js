const connections=require('./index')

class TagService{
  async checkTagName(name){
    const statement=`SELECT * FROM tags WHERE name =?`
    const res=await connections.execute(statement,[name])
    console.log(res);
    return res[0]
  }
  async addTag(name){
    const statement=`INSERT INTO tags (name) VALUES(?)`
    const res=await connections.execute(statement,[name])
    return res[0]

  }
  async list(query){
  const {nopage,start,limit,name}=query
  console.log(nopage);
  console.log(start);
  console.log(limit);
  console.log(name);
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