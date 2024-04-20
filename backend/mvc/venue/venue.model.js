const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    state: { type: DataTypes.STRING, allowNull: false },
    perDayCharge41: { type: DataTypes.INTEGER, allowNull: false },
    perDayCharge61: { type: DataTypes.INTEGER, allowNull: false },
    perDayCharge71: { type: DataTypes.INTEGER, allowNull: false },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  const options = {
    defaultScope: {
      // Define default scopes or exclusions here
    },
    scopes: {
      // Define additional scopes here if needed
    },
  };

  return sequelize.define("Venue", attributes, options);
}
