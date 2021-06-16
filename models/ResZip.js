/**
 * RESOURCE FABRIC MODEL
 */
 const Sequelize = require('sequelize');
 const sequelize = require('../utils/database');
 const Model =  Sequelize.Model;
 class ResZip extends Model {} 

 ResZip.init({
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
    mdl_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    xml_url: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    img_url:  { 
        type: Sequelize.STRING,
        allowNull: false
    }
 },{
    sequelize, 
    modelName: 'res_zip',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResZip;



