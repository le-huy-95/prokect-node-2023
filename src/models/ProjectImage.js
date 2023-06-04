'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Projects_Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Projects_Image.init({
        projectId: DataTypes.STRING,
        ImageId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Projects_Image',
    });
    return Projects_Image;
};