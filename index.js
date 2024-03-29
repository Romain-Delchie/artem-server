require('dotenv').config();
const debugServer = require('debug')('server');
const http = require('http');
const app = require('./app/app');

// Gestion des erreurs non catchées
process.on('uncaughtException', (err) => {
  // On quitte le serveur
  console.log(err);
  process.exit(1);
});

// Gestion des promesses rejetée et non catchées
process.on('unhandledRejection', (err) => {
  throw err;
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;
const host = process.env.MYSQL_HOST || 'localhost';

server.listen(port, () => {
  console.log(`Server launched at http://${host}:${port}`);
});