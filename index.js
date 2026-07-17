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

const port = process.env.EXPRESS_PORT;
const host = process.env.EXPRESS_HOST;

server.listen(port, () => {
  console.log(`Server launched at http://${host}:${port}`);
});