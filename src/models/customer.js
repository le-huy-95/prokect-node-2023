'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasMany(models.Projects, { foreignKey: "customerId" });
            Customer.belongsTo(models.Province_customer, { foreignKey: "Province_customerId" });
            Customer.belongsTo(models.District_customer, { foreignKey: "District_customerId" });
            Customer.belongsTo(models.Ward_customer, { foreignKey: "Ward_customerId" });
        }
    };
    Customer.init({
        name: DataTypes.STRING,
        age: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        addressDetail: DataTypes.STRING,
        note: DataTypes.STRING,
        Province_customerId: DataTypes.INTEGER,
        District_customerId: DataTypes.INTEGER,
        Ward_customerId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};