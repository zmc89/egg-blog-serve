'use strict';

const Controller = require('egg').Controller;
const userVar = require('../validator/request/user')

class UserController extends Controller {
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
}

module.exports = UserController;
