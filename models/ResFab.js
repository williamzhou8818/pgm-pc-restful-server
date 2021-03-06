/**
 * RESOURCE FABRIC MODEL
 */
 const Sequelize = require('sequelize');
 const sequelize = require('../utils/database');
 const Model =  Sequelize.Model;
 class ResFab extends Model {} 

 ResFab.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.STRING,
        // autoIncrement: true, 
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fab_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    img_name:  {
        type: Sequelize.STRING,
        allowNull: true
    },  
    fab_img_url: {
        type: Sequelize.STRING,
        allowNull: true
    }
 },{
    sequelize, 
    modelName: 'res_fab',
    paranoid: true,
    timestamps: true,
 });

 module.exports = ResFab;



