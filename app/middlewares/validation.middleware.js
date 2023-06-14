/**
 * @summary middleware factory pour la validation des données en entrée
 */
module.exports = (schema, dataSource) => async (req, res, next) => {
    try {
      await schema.validateAsync(req[dataSource]);
      next();
    } catch (err) {
      next(err);
    }
  };