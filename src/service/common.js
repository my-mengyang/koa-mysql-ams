const connections=require('./index')


class CommonService{
  //总条数
  async count(tableName){
    const statement=`SELECT COUNT(*) FROM ${tableName}`
    const res=await connections.execute(statement)
    return res[0][0]['COUNT(*)']
  }
}

module.exports=new CommonService()