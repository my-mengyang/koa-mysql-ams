const connections=require("./index")

const dayjs=require("dayjs")


class CommonService{
  async obtainArticleCount(){
    const statement=`SELECT count(id) as count FROM article`
    const res=await connections.execute(statement)
    return res[0][0].count
  }

  async obtainArticleRead(){
    const statement=`SELECT SUM(readVolume) as num FROM article`
    const res=await connections.execute(statement)
    return res[0][0].num
  }

  async obtainCommentCount(){
    const statement=`SELECT count(id) as count FROM comment`
    const res=await connections.execute(statement)
    return res[0][0].count
  }

  async obtainArticlePraise(){
    const statement=`SELECT SUM(praise) as num FROM article`
    const res=await connections.execute(statement)
    return res[0][0].num
  }
}


module.exports = new CommonService()
