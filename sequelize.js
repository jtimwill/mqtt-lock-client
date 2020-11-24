const Sequelize = require('sequelize');
const LogModel = require('./models/log'); // Import model
const db = "./db/development.sqlite";
// Set up database
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: db
});
// create log class from model
const Log = LogModel(sequelize, Sequelize);
// Create database tables
sequelize.sync().then(() => {
  console.log("Log table created in database");
});

module.exports = {
  Log,
  sequelize
};
