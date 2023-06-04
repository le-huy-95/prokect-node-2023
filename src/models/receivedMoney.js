'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status_Received_money extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Status_Received_money.hasMany(models.Projects, { foreignKey: "receiveMoneyId" });

        }
    };
    Status_Received_money.init({
        status: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Status_Received_money',
    });
    return Status_Received_money;
};