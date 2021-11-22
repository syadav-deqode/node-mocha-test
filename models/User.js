const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const User = sequelize.define('User', {
  id: {
    autoIncrement: true,
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(1024),
    field: 'name'
  },
  email: {
    type: Sequelize.STRING(1024),
    field: 'email'
  },
}, {
  timestamps: false,
  tableName: 'user',
  indexes: [{ unique: true, fields: ['email'] }]
})

User.sync()

module.exports = User;