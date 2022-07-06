'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, BOOLEAN, DATE } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, },
      username: { type: STRING(16), allowNull: false, unique: true, comment: '用户名' },
      nikeName:{type: STRING(64),comment:'昵称'},
      password: { type: STRING(255), allowNull: false, comment: '密码' },
      avatar: { type: STRING(255), comment: '密码' },
      phone: { type: STRING(20), comment: '手机号码', unique: true },
      status: { type: BOOLEAN, comment: '状态' },
      deleted_at: { type: DATE },
      created_at: { allowNull: false, type: DATE },
      updated_at: { allowNull: false, type: DATE }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user');
  }
};
