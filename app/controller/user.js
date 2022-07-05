'use strict';

const Controller = require('egg').Controller;
const userVar = require('../validator/request/user')

class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    const params = {
        username:userVar.user.username,
        password:userVar.user.password
    }
    ctx.validate(params,ctx.request.body)
    const res = await service.user.login(ctx.request.body)

  }
}

module.exports = UserController;
