const mysql=require('mysql2')

const config=require('../config')
console.log(config.MYSQL_HOST)

const connections=mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_ROOT,
  password:config.MYSQL_PASSWORD,
})
console.log(connections)

connections.getConnection((err,conn)=>{
  console.log(err)
  console.log(conn)
  conn.connect((err)=>{
    if (err) {
      console.log(`连接失败`,err)
    }else{
      console.log(`数据库连接成功`)
    }
  })
})

module.exports=connections.promise()