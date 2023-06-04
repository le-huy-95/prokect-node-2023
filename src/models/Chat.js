'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chat.belongsTo(models.Projects, { foreignKey: "projectId" });

        }
    };
    Chat.init({
        projectId: DataTypes.INTEGER,
        image: DataTypes.BLOB,
        text: DataTypes.STRING,
        CreatedByName: DataTypes.STRING,
        CreatedByPhone: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Chat',
    });
    return Chat;
};