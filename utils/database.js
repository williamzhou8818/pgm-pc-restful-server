const Sequelize = require('sequelize');



const sequelize = new Sequelize('aphro3d_pgm', 'root', 'zhouli1118', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;


// const sequelize = new Sequelize('pgm_aphro3d', 'pgm_aphro3d', 'Pgm51751700', {
//             dialect: 'mysql',
//             host: 'rm-bp1hvi6gb54mi3riy4o.mysql.rds.aliyuncs.com'
// });

// module.exports = sequelize;


