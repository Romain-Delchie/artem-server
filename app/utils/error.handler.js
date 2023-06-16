const debug = require('debug')('app:error');

module.exports = (err, req, res, next) => {
  debug(err);

  // Erreurs personnalisées
  if (err.name === 'ArtemError') {
    return res.status(err.status).json({ error: err.message });
  }

  

  // Par défaut
  return res.status(500).json({
    error: err.message
  });
};