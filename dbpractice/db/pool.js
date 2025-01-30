const { Pool } = require('pg');

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABSE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
