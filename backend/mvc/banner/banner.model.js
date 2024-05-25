const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        filename: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        // Additional options can be added here
    };

    return sequelize.define('Banner', attributes, options);
}
