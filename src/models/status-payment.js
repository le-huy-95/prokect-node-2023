'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status_Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Status_Payment.hasMany(models.Projects, { foreignKey: "statusPaymentId" });

        }
    };
    Status_Payment.init({
        status: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Status_Payment',
    });
    return Status_Payment;
};