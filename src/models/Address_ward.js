'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Address_Ward.belongsTo(models.Address_District, { foreignKey: "Address_DistrictId" });

      Address_Ward.hasMany(models.Projects, { foreignKey: "Address_WardId" });

    }
  };
  Address_Ward.init({
    Address_DistrictId: DataTypes.INTEGER,
    name: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Address_Ward',
  });
  return Address_Ward;
};