const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const Events = sequelize.define('events', {

    eventId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userUserId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
    
});

module.exports = {
    Events
};