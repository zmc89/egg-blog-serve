'use strict';

module.exports = (app) => {
  const { STRING, INTEGER,BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username:{type: STRING(16), allowNull: false},
    password: {type: STRING(255), allowNull: false},
    avatar:{type: STRING(255)},
    phone:{type: STRING(20)},
    status:{type: BOOLEAN}
  });

  return User;
};