'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status_Delivery extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Status_Delivery.hasMany(models.Projects, { foreignKey: "statusDeliveryId" });

        }
    };
    Status_Delivery.init({
        status: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Status_Delivery',
    });
    return Status_Delivery;
};