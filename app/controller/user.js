'use strict';

const Controller = require('egg').Controller;
const userVar = require('../validator/request/user')

class UserController extends Controller {
  /**
   * @description 获取图片验证码
   */
  async getCaptCha() {
    const { ctx, app } = this;
    const res = await ctx.helper.tools.verifyCode()
    if (!res) {
     return ctx.helper.body.INVALID_REQUEST({ ctx, res, msg: '获取验证码失败' })
    }
    await app.redis.set(res.captChaId, res.text)
    await app.redis.expire(res.captChaId, 600)
    // delete res.text
    ctx.helper.body.SUCCESS({ ctx, res })
  }

  /**
   * @description 登录
   */
  async login() {
    const { ctx, service } = this;
    const params = {
      username: userVar.user.username,
      password: userVar.user.password,
      captChaId: userVar.user.captChaId,
      code: userVar.user.code
    }
    ctx.validate(params, ctx.request.body)
    const resCode = await service.user.verifyImgCode(ctx.request.body.captChaId, ctx.request.body.code)
    if (resCode.err_code) {
      return ctx.helper.body.INVALID_REQUEST({ ctx, code: 4004, msg: '验证码失效' });
    }
    if (!resCode) {
      return ctx.helper.body.INVALID_REQUEST({ ctx, code: 4000, msg: '验证码错误' });
    }
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
  async userInfo() {
    const { ctx, service, app } = this;
    let token = await ctx.request.headers.authorization.split('Bearer ')[1]
    const user = await app.jwt.verify(token, app.config.jwt.secret);
    if (!user) {
      return ctx.helper.body.UNAUTHORIZED({ ctx })
    }
    const res = await service.user.userInfo(user.data)
    ctx.helper.body.SUCCESS({ ctx, res })
  }
  /**
 * @description 更新用户信息
 */
  async update() {
    const { ctx, service } = this
    const res = await service.user.update(ctx.request.body)
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx,msg:'修改成功' }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = UserController;
