require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "mysql",

  // Connection pool: reuse DB connections instead of opening a new one per query.
  pool: {
    max: 5,        // max simultaneous connections in the pool
    min: 0,        // min connections kept open
    acquire: 30000, // ms to wait for a connection before throwing an error
    idle: 10000     // ms a connection can be idle before being released
  }
};