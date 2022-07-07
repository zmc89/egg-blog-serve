'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  /**
  * @description 验证图片验证码
  */
  async verifyImgCode(id, code) {
    const { app } = this
    const verifycode = await app.redis.get(id)
    if(!verifycode){
      return {
        err_code:4004
      }
    }
    if (verifycode.toLowerCase() != code) {
      return false
    } else {
      app.redis.del(id)
      return true
    }
  }

  async login(payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: { username: payload.username },
    })
    if (!user) {
      return {
        err_code: 4004
      }
    }
    const verifyPwd = await ctx.helper.tools.verifyPassword(payload.password, user.dataValues.password)
    if (!verifyPwd) {
      return {
        err_code: 4000
      }
    }
    const userInfo = { id: user.dataValues.id, username: user.dataValues.username }
    const token = ctx.helper.tools.createToken(ctx, userInfo)
    return token
  }

  async userInfo(payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: { id: payload.id },
      attributes: { exclude: ['password', 'deleted_at', 'username'] }
    })
    return user
  }
}

module.exports = UserService;
