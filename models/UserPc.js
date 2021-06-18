const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Model =  Sequelize.Model;
class UserPc extends Model {}

UserPc.init({
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
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    password:  {
        type: Sequelize.STRING,
        allowNull:false
    }
}, { 
    sequelize, 
    modelName: 'user_pc',
    paranoid: true,
    timestamps: true,
 });
 module.exports = UserPc;