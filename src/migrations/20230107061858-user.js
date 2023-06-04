'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      addressDetail: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.BLOB
      },
      Account_number: {
        type: Sequelize.STRING
      },
      Bank_name: {
        type: Sequelize.STRING
      },
      Province_customerId: {
        type: Sequelize.INTEGER

      },
      District_customerId: {
        type: Sequelize.INTEGER

      },
      Ward_customerId: {
        type: Sequelize.INTEGER

      },
      Position: {
        type: Sequelize.STRING
      },
      shippingUnit_Id: {
        type: Sequelize.INTEGER

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};