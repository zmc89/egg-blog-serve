'use strict';

module.exports = (app) => {
  const { STRING, INTEGER,BOOLEAN } = app.Sequelize;

  const Menu = app.model.define('menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name:{type: STRING(16), allowNull: false},
    path:{type: STRING(255),allowNull:false},
    sort:{type: INTEGER},
    hidden:{type: BOOLEAN}
  });

  return Menu;
};