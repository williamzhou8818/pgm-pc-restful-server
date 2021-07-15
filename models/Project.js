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
    project_file_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    project_file: {
        type: Sequelize.STRING,
        allowNull: true
    },
    proj_profile_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    proj_profile: { 
        type: Sequelize.STRING,
        allowNull: true
    },
    proj_profile_3d_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    proj_profile_3d: {
        type: Sequelize.STRING,
        allowNull: true
    },  
    checked: {
        type:Sequelize.BOOLEAN,
        allowNull: true
    }

}, { 
    sequelize, 
    modelName: 'project',
    paranoid: true,
    timestamps: true,
 });
 module.exports = Project;