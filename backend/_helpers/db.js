const config = require("../config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  db.User = require("../mvc/users/user.model")(sequelize);
  db.Venue = require("../mvc/venue/venue.model")(sequelize);
  db.Enquiry = require("../mvc/enquiry/enquiry.model")(sequelize);
  db.Banner = require("../mvc/banner/banner.model")(sequelize);
  db.Car = require("../mvc/cars/car.model")(sequelize);
  db.Insurance = require("../mvc/Insurance/Insurance.model")(sequelize);
  db.JobListing = require("../mvc/Jobs/Jobs.model")(sequelize);
  
   // sync all models with database
  await sequelize.sync();
}
