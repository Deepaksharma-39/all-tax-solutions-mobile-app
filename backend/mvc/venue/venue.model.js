const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        seatingCapacity: { type: DataTypes.INTEGER, allowNull: false },
        perDayCharge: { type: DataTypes.FLOAT, allowNull: false },
    };

    const options = {
        defaultScope: {
            // Define default scopes or exclusions here
        },
        scopes: {
            // Define additional scopes here if needed
        }
    };

    return sequelize.define('Venue', attributes, options);
}
