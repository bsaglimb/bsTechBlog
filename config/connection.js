// Importing the 'dotenv' library to read environment variables from a .env file
require('dotenv').config();

// Importing the Sequelize library
const Sequelize = require('sequelize');

// Creating a Sequelize instance based on the presence of a JAWSDB_URL environment variable
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      port: 8889,
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Exporting the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;