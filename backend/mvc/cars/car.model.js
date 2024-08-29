const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const attributes = {
        make: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: { type: DataTypes.TEXT },
        registrationNumber: { type: DataTypes.STRING, allowNull: false },
        registrationDate: { type: DataTypes.DATE, allowNull: false },
        images: { type: DataTypes.JSON, allowNull: true }, // Storing image URLs as JSON array
        userID:{ type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
            // Example: Default scope to exclude `description` for some use cases
            attributes: { exclude: ['description'] }
        },
        scopes: {
            // Include `description` in this scope
            withDescription: { attributes: {} }
        }
    };

    return sequelize.define('Car', attributes, options);
};
