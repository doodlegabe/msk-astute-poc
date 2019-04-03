const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
console.log('now on ' + env);
const config = require(`${__dirname}/../config/envs.js`)[env];

let sequelize;
if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    dialect:  'postgres',
    protocol: 'postgres',
    host:     `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    logging:  false
  };
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, prodConfig);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

global.db = {};

fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(global.db).forEach(modelName => {
  if (global.db[modelName].associate) {
    global.db[modelName].associate(global.db);
  }
});

global.db.sequelize = sequelize;
global.db.Sequelize = Sequelize;

module.exports = global.db;