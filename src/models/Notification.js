'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Notification.init({
        ProjectId: DataTypes.INTEGER,
        Order: DataTypes.STRING,
        Change_content: DataTypes.STRING,
        ChangeBy: DataTypes.STRING,
        CreatedBy: DataTypes.STRING,
        ViewByuser: DataTypes.STRING,
        ViewByStaff: DataTypes.STRING,
        Unit: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};