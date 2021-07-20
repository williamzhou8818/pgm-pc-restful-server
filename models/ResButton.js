/**
 * RESOURCE FABRIC MODEL
 */
 const Sequelize = require('sequelize');
 const sequelize = require('../utils/database');
 const Model =  Sequelize.Model;
 class ResButton extends Model {} 

 ResButton.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    mdl_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mdl_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    xml_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    xml_url: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    img_name: { 
        type: Sequelize.STRING,
        allowNull: true
    },
    img_url:  { 
        type: Sequelize.STRING,
        allowNull: true
    }
 },{
    sequelize, 
    modelName: 'res_button',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResButton;



