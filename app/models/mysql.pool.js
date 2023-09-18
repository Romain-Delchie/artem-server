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



// require('dotenv').config();
// const debug = require('debug')('SQL:logger');
// const mysql = require('mysql');

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
// });

// module.exports = {
//   originalPool: pool,

//   async query(...params) {
//     console.log(...params)
//     debug(...params);
// console.log()
//     return this.originalPool.query(...params);

    
//   },
// };
// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Erreur lors de la connexion à la base de données :', err);
//     return;
//   }

//   // Exécutez la requête pour récupérer les bases de données
//   connection.query('SELECT * FROM profile', (error, results) => {
//     connection.end(); // Fermez la connexion après avoir récupéré les résultats

//     if (error) {
//       console.error('Erreur lors de l\'exécution de la requête :', error);
//       return;
//     }

//     console.log('Bases de données MySQL :', results);
//   });
// });




