const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const User = sequelize.define('users', {

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: true
    }
});

module.exports = {
  User
}