require('dotenv').config;

const { Pool } = require('pg');

const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } =
  process.env;

module.exports = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});
