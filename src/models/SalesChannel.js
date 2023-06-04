'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sales_Channel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Sales_Channel.hasMany(models.Projects, { foreignKey: "salesChannelId" });
        }
    };
    Sales_Channel.init({
        name: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Sales_Channel',
    });
    return Sales_Channel;
};