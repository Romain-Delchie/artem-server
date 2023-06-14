const debug = require('debug')('app');

module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
    debug(req.originalUrl, 'responded');
  } catch (error) {
    next(error);
  }
};