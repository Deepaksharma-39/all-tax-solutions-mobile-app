const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Car = sequelize.define('Car', {
        make: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: { type: DataTypes.TEXT },
        registrationNumber: { type: DataTypes.STRING, allowNull: false },
        registrationDate: { type: DataTypes.DATE, allowNull: false },
        images: { type: DataTypes.JSON, allowNull: true }, // Storing image URLs as JSON array
        userID: { type: DataTypes.INTEGER, allowNull: false }
    });

    // Define the relationship with User model
    Car.belongsTo(sequelize.models.User, { foreignKey: 'userID', as: 'user' });

    return Car;
};
