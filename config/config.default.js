/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657030425573_7933';

  // add your middleware config here
  config.middleware = ['verifyToken','errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    jwt_exp: 60 * 10, // jwt过期时间(秒)
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'blog-serve',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: true,
      paranoid: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }


  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.jwt = {
    secret: 'zmc-serve',
    enable: true,
    match: /^\/api/
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 1,
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};
