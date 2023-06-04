module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Address_Ward', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Address_DistrictId: {
        type: Sequelize.INTEGER

      },
      name: {
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
    await queryInterface.dropTable('Address_Ward');
  }
};