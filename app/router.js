'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //获取图片验证码
  router.get('/captCha',controller.user.getCaptCha)

  //登录
  router.post('/login',controller.user.login)

  //用户相关
  router.get('/api/user/userInfo',controller.user.userInfo)
  router.put('/api/user/userInfo',controller.user.update)

  //菜单相关
  router.post('/api/menu/create',controller.menu.createMenu)
  router.put('/api/menu/update',controller.menu.updateMenun)
  router.delete('/api/menu/delete/:id',controller.menu.deleteMenu)
};
