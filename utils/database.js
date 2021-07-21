const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');

const loc_host = process.env.DB_HOST;
const loc_user = process.env.DB_USER;
const loc_pass = process.env.DB_PASS;
const loc_table = process.env.DB_TABLE;

const db_type = process.env.DB_TYPE;

const sequelize = new Sequelize(loc_table, loc_user, loc_pass, {
    dialect: db_type,
    host: loc_host,
});

module.exports = sequelize;


// const sequelize = new Sequelize('pgm_aphro3d', 'pgm_aphro3d', 'Pgm51751700', {
//             dialect: 'mysql',
//             host: 'rm-bp1hvi6gb54mi3riy4o.mysql.rds.aliyuncs.com'
// });

// module.exports = sequelize;


