const { Sequelize } = require('sequelize');
require('dotenv').config();

// Employee database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// Attendance database
const sequelize1 = new Sequelize(process.env.DB1_NAME, process.env.DB1_USER, process.env.DB1_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

module.exports = { sequelize, sequelize1 };
