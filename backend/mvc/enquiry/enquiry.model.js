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
        toDate: { type: DataTypes.DATE, allowNull: false },
        receiptPath: { type: DataTypes.STRING, allowNull: true },
        amount: { type: DataTypes.STRING, allowNull: true },
        payment_done: { type: DataTypes.BOOLEAN, allowNull: true },
    });

    // Define the relationship with User model
    Enquiry.belongsTo(sequelize.models.User, { foreignKey: 'userId' });

    return Enquiry;
}
