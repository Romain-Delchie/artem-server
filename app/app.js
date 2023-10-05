const debug = require('debug')('app');
const path = require('path');
const cors = require('cors');
const express = require('express');
const expressJsDocSwagger = require('express-jsdoc-swagger');
const router = require('./routers');
const errorHandler = require('./utils/error.handler');


// Configuration de express-jsdoc-swagger
const options = {
  info: {
    version: '0.0.1',
    title: 'Artem API',
    description: 'Documentation de l\'API back Artem',
  },
  // Dossier de base de recherche des fichiers jsdoc
  baseDir: __dirname,
  // Pattern pour trouver les fichiers jsdoc
  filesPattern: './routers/*.js',
  // URL de swagger UI
  swaggerUIPath: '/api-docs',
  // Activer OpenAPI UI
  exposeSwaggerUI: true,
  // Exposer la documentation Open API JSON Docs sur l'url `apiDocsPath`.
  exposeApiDocs: true,
  // Url des Open API JSON Docs.
  apiDocsPath: '/api/docs',
};

const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}


// Activer express-jsdoc-swagger
expressJsDocSwagger(app)(options);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(router);
app.use(errorHandler);

module.exports = app;