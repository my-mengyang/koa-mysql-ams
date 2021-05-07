const connections=require('./index')


class FriendService{
  async addFriend(params){
    const {websiteIcon,name,website}=params
    const mysql=`INSERT INTO friend (name,websiteIcon,website) VALUES (?,?)`
    const res=await connections.execute(mysql,[name,websiteIcon,website])
    return res[0]
  }
}

module.exports =new FriendService()