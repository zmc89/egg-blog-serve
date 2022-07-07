'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { STRING, INTEGER, BOOLEAN,DATE } = Sequelize;
    await queryInterface.createTable('menu', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name:{type: STRING(16), allowNull: false,comment:"路由名称"},
      path:{type: STRING(255),allowNull:false,comment:"路由路径"},
      sort:{type: INTEGER,comment:"排序"},
      hidden:{type: BOOLEAN,comment:"是否显示"},
      deleted_at: { type: DATE },
      created_at: { allowNull: false, type: DATE },
      updated_at: { allowNull: false, type: DATE }
    })

  },

  async down (queryInterface) {
    await queryInterface.dropTable('menu');
  }
};
