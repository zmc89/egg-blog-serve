'use strict';

const Controller = require('egg').Controller;
const userVar = require('../validator/request/user')

class UserController extends Controller {
  /**
   * @description 获取图片验证码
   */
  async getCaptCha(){
    const { ctx, service } = this;
    const res = await ctx.helper.tools.verifyCode()
    console.log(res)
  }





  /**
   * @description 登录
   */
  async login() {
    const { ctx, service } = this;
    const params = {
        username:userVar.user.username,
        password:userVar.user.password
    }
    ctx.validate(params,ctx.request.body)
    const res = await service.user.login(ctx.request.body)
    switch (res.err_code) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      case 4000:
        ctx.helper.body.INVALID_REQUEST({ ctx, code: 4000, msg: '密码错误' });
        break;
      case 4004:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: 4004,
          msg: '用户不存在',
        });
        break;
      case 4005:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: 4005,
          msg: '账号已停用',
        });
        break;
      default:
        ctx.helper.body.UNAUTHORIZED({ ctx });
        break;
    }
  }
   /**
   * @description 获取用户信息
   */
  async userInfo(){
    const { ctx, service,app } = this;
    let token = await ctx.request.headers.authorization.split('Bearer ')[1]
    const user = await app.jwt.verify(token,app.config.jwt.secret);
    if(!user){
      ctx.helper.body.UNAUTHORIZED({ctx})
    }
   const res = await service.user.userInfo(user.data)
    ctx.helper.body.SUCCESS({ctx,res})
  }
}

module.exports = UserController;
