require('dotenv').config();
const debug = require('debug')('SQL:logger');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = {
  originalPool: pool,

  async query(...params) {
    // Ajoutez ici tout code de débogage si nécessaire
    debug(...params);
    return new Promise((resolve, reject) => {
      this.originalPool.query(...params, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};