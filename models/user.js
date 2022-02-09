const Sequelize = require("sequelize");

const { sequelize } = require('../db.js');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, { tableName: 'user' });

module.exports = {
  User,
}