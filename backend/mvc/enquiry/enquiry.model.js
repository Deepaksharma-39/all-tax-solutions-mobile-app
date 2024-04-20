const { DataTypes } = require('sequelize');

module.exports = model;
 
function model(sequelize) {
    const Enquiry = sequelize.define('Enquiry', {
        state: { type: DataTypes.STRING, allowNull: false },
        vehicleNumber: { type: DataTypes.STRING, allowNull: false },
        seatingCapacity: { type: DataTypes.INTEGER, allowNull: false },
        borderEntry: { type: DataTypes.STRING, allowNull: false },
        taxMode: { type: DataTypes.STRING, allowNull: false },
        fromDate: { type: DataTypes.DATE, allowNull: false },
        toDate: { type: DataTypes.DATE, allowNull: false }
    });

    // Define the relationship with User model
    Enquiry.belongsTo(sequelize.models.User, { foreignKey: 'userId' });

    return Enquiry;
}
