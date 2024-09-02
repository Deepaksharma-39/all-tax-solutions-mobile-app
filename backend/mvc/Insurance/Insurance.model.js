const { DataTypes } = require('sequelize');

module.exports = model;
 
function model(sequelize) {
    const Insurance = sequelize.define('Insurance', {
        Name: { type: DataTypes.STRING, allowNull: false },
        InsurerName: { type: DataTypes.STRING, allowNull: false },
        Phone: { type: DataTypes.STRING, allowNull: false },
    });

    // Define the relationship with User model
    Insurance.belongsTo(sequelize.models.User, { foreignKey: 'userId' });

    return Insurance;
}
