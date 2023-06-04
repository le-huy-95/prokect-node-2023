'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shipping_Cost', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shippingUnit_Id: {
        type: Sequelize.INTEGER

      },

      From: {
        type: Sequelize.STRING
      },
      To: {
        type: Sequelize.STRING
      },
      Cost: {
        type: Sequelize.STRING

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
    await queryInterface.dropTable('Shipping_Cost');
  }
};