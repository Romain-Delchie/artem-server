require('dotenv').config();
const debug = require('debug')('SQL:logger');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

module.exports = {
  originalPool: pool,

  async query(...params) {
    debug(...params);

    return this.originalPool.query(...params);
  },
};