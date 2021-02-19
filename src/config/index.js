const dotenv=require('dotenv')
const fs=require('fs')
const path=require('path')

dotenv.config()

module.exports={
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT,
  MYSQL_PASSWORD
}=process.env