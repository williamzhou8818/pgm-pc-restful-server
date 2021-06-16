/**
 * RESOURCE FABRIC MODEL
 */
 const Sequelize = require('sequelize');
 const sequelize = require('../utils/database');
 const Model =  Sequelize.Model;
 class ResModel extends Model {} 

 ResModel.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    ava_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ava_img_url: {
        type: Sequelize.STRING,
        allowNull: false
    }
 },{
    sequelize, 
    modelName: 'res_model',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResModel;



