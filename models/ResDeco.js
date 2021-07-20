/**
 * RESOURCE FABRIC MODEL
 */
 const Sequelize = require('sequelize');
 const sequelize = require('../utils/database');
 const Model =  Sequelize.Model;
 class ResDeco extends Model {} 

 ResDeco.init({
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
    drc_name: { 
        type: Sequelize.STRING,
        allowNull: true
    },
    drc_url: {
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
    modelName: 'res_deco',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResDeco;



