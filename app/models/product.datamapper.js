const CoreDatamapper = require('./core.datamapper');

module.exports = class Product extends CoreDatamapper {
  tableName = 'product';

  async findAllByRange(id) {
    const preparedQuery =
      `SELECT *
    FROM ${this.tableName}
    WHERE product.range_id = ?`;

    const result = await this.client.query(preparedQuery, [id]);
    if (!result) {
      return [];
    }
    return result;
  }
};