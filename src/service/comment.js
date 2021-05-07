const connections=require("./index")
const dayjs =require('dayjs')

class CommentService{
  //新增评论
  async addComment(query){
    const {article_id,type,content,from_name,from_email,from_website,userAgent,to_name,to_email,to_website} =query
    let time=dayjs().unix()
    const statement=`INSERT INTO comment (article_id,type,content,from_name,from_email,from_website,userAgent,to_name,to_email,to_website,createTime) VALUES (?,?,?,?,?,?,?,?,?,?)`
  const res=await connections.execute(statement,[article_id,type,content,from_name,from_email,from_website,userAgent,(to_name||null),(to_email||null),(to_website||null),time])
    return res[0]
  }

  //列表
  async list(query){
    const {id,nopage,start,limit,start_time,end_time}=query
    let statement=`SELECT SQL_CALC_FOUND_ROWS c.id,c.type,c.content,c.from_name,c.from_email,c.from_website,c.createTime,c.status,c.praise,c.to_name,c.to_email,c.to_website,c.userAgent,a.title,a.id as article_id FROM comment c LEFT JOIN article a ON c.article_id =a.id WHERE c.deleted =0 AND c.createTime BETWEEN ${start_time ||0} AND ${end_time ||dayjs().unix()}`
    if(id){
      statement+= ` AND c.article_id =${id}`
    }
    if(nopage === '0'){
      statement+=` LIMIT ${start*limit},${limit}`
    }
    statement+=` ORDER BY c.createTime DESC`
    const res=await connections.execute(statement)
    let constSql=`SELECT FOUND_ROWS()`
    const countRes=await connections.execute(constSql)
    return {
      data:res[0],
      total:countRes[0][0]['FOUND_ROWS()']
    }
  }

  async editComment(query){
    const {id,status}=query
    const statement=`UPDATE comment SET status=${status} WHERE id=${id}`
    const res=await connections.execute(statement)
    return res[0]
  }

  async pariseAdd(query){
    const {id}=query
    const statement=`UPDATE comment SET praise=praise +1 WHERE id=${id}`
    const res =await connections.execute(statement)
    return res[0]
  }
}

module.exports =new CommentService()