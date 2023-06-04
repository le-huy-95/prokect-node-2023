'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status_Pickup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Status_Pickup.hasMany(models.Projects, { foreignKey: "statuspickupId" });

        }
    };
    Status_Pickup.init({
        status: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Status_Pickup',
    });
    return Status_Pickup;
};