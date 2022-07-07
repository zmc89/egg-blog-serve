const Service = require('egg').Service;

class UserService extends Service {
    /**
     * @description 创建菜单
     */
    async create(payload) {
        const { ctx } = this
        return await ctx.model.Menu.create(payload)
    }
    /**
    * @description 更新菜单
    */
    async update(payload) {
        const { ctx } = this
        return await ctx.model.Menu.update({
            name: payload.name,
            path: payload.path,
            sort: payload.sort,
            hidden: payload.hidden
        }, {
            where: {
                id: payload.id
            }
        })
    }
    /**
    * @description 删除菜单
    */
    async delete(payload) {
        const { ctx } = this
        return await ctx.model.Menu.destroy({
            where: {
                id: payload
            }
        })
    }
}

module.exports = UserService;
