const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Model =  Sequelize.Model;
class Project extends Model {}

Project.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: { //project_id
        type: Sequelize.STRING,
        // autoIncrement: true, 
        allowNull: false 
    },
    project_file: {
        type: Sequelize.STRING,
        allowNull: false
    },
    proj_profile: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    checked: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    }

}, { 
    sequelize, 
    modelName: 'project',
    paranoid: true,
    timestamps: true,
 });
 module.exports = Project;