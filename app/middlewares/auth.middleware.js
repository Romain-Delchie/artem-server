const jwt = require('jsonwebtoken');
const debug = require('debug')('app:auth.middleware');
const ArtemError = require('../errors/artem-error');

module.exports = {
  /**
   * @summary vérifie si le token est valide
   * @param {string} req.headers['x-auth-token'] requis - jwt token
   */
  checkToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      throw new ArtemError('No token provided, authorization denied', 401);
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.exp && Date.now() / 1000 > decodedToken.exp) {
        console.log('Token has expired, authorization denied');
        throw new ArtemError('Token has expired, authorization denied', 401);
      }
      req.userId = decodedToken.id;
      req.userRole = decodedToken.role;
      req.userEmail = decodedToken.email;

      return next();
    } catch (err) {
      throw new ArtemError('Invalid token provided, authorization denied', 401);
    }
  },
};