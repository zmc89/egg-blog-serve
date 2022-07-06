'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async login(payload) {
   const { ctx } = this;
   const user = await ctx.model.User.findOne({
        where: { username: payload.username },
      })
      if(!user){
        return {
          err_code:4004
        }
      }
     const verifyPwd = await ctx.helper.tools.verifyPassword(payload.password,user.dataValues.password)
     if(!verifyPwd){
      return {
        err_code:4000
      }
     }
     const userInfo = {id:user.dataValues.id,username:user.dataValues.username}
     const token = ctx.helper.tools.createToken(ctx,userInfo)
     return token
  }

  async userInfo(payload){
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where:{id:payload.id},
      attributes: { exclude: ['password', 'deleted_at','username'] }
    })
    return user
  }
}

module.exports = UserService;
