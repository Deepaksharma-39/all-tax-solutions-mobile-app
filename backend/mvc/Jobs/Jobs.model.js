const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const JobListing = sequelize.define('JobListing', {
        jobTitle: { type: DataTypes.STRING, allowNull: false }, // e.g., Driver
        jobType: { type: DataTypes.STRING, allowNull: false }, // e.g., Full-time, Part-time, Temporary
        description: { type: DataTypes.TEXT, allowNull: true }, // Job description, can be optional
        requirements: { type: DataTypes.STRING, allowNull: false }, // e.g., "Driver Wanted"
        salary: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, // Optional salary field
        location: { type: DataTypes.STRING, allowNull: false }, // e.g., New York, Los Angeles
        postDate: { type: DataTypes.DATE, allowNull: true }, // Date job was posted
        expiryDate: { type: DataTypes.DATE, allowNull: true }, // Optional expiry date
        contactNo: { type: DataTypes.STRING, allowNull: false } // Contact number for inquiries
    });

    // Define the relationship with User model
    JobListing.belongsTo(sequelize.models.User, { foreignKey: 'userId', as: 'user' });

    return JobListing;
};
