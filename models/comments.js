'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {

        static associate(models) {

            models.comment.belongsTo(models.user)
        }
    };
    comment.init({
        name: DataTypes.STRING,
        species: DataTypes.STRING,
        description: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'comment',
    });
    return comment;
};