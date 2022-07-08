'use strict';

const Controller = require('egg').Controller;
const menuVar = require('../validator/request/menu')

class MenuController extends Controller {
    /**
   * @description 创建菜单
   */
    async createMenu() {
        const { ctx, service } = this;
        ctx.validate(menuVar.menu, ctx.request.body)
        await service.menu.create(ctx.request.body)
         ctx.helper.body.CREATED_UPDATE({ ctx, msg: '创建成功' });
    }
      /**
     * @description 更新菜单
     */
    async updateMenun(){
        const {ctx,service} = this
        ctx.validate(menuVar.menu, ctx.request.body)
        const res = await service.menu.update(ctx.request.body)
        res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx,msg:'修改成功' }) : ctx.helper.body.NOT_FOUND({ ctx });
    }
    /**
     * @description 删除菜单
     */
    async deleteMenu(){
        const {ctx,service} = this
        const res = await service.menu.delete(ctx.params.id)
        if(!res){
            return  ctx.helper.body.NOT_FOUND({ ctx })
        }
        ctx.helper.body.SUCCESS({ctx,msg:"删除成功"})
    }
}

module.exports = MenuController;
