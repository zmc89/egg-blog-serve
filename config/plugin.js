'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt:{
    enable:true,
    package:'egg-jwt'
  },
  security:{
    enable:true,
    package:'egg-security'
  }
};
