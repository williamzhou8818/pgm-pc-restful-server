const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Model = Sequelize.Model;
class FakeProjectModel extends Model {}

FakeProjectModel.init({
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
        allowNull: false
    },
    img_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    checked: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    }
}, { 
    sequelize, 
    modelName: 'fake_project_model',
    paranoid: true,
    timestamps: true,
})
module.exports = FakeProjectModel;