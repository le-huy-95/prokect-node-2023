'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status_Warehouse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Status_Warehouse.hasMany(models.Projects, { foreignKey: "statuswarehouseId" });

        }
    };
    Status_Warehouse.init({
        status: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Status_Warehouse',
    });
    return Status_Warehouse;
};