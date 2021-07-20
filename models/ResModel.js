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
    ava_name: { 
        type: Sequelize.STRING,
        allowNull: true
    },
    ava_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    img_name: { 
        type: Sequelize.STRING,
        allowNull: true
    },
    ava_img_url: {
        type: Sequelize.STRING,
        allowNull: true
    }
 },{
    sequelize, 
    modelName: 'res_model',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResModel;



