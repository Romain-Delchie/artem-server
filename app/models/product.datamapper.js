const CoreDatamapper = require('./core.datamapper');

module.exports = class Product extends CoreDatamapper {
  tableName = 'product';

  async findAllProducts() {
    const preparedQuery =
      `SELECT product.*, range.minPrice as minPrice
    FROM ${this.tableName}
    JOIN \`range\` ON product.range_id = range.id;
    `;

    const result = await this.client.query(preparedQuery);
    if (!result) {
      return [];
    }
    return result;
  }

  async findAllByRange(id) {
    const preparedQuery =
      `SELECT product.*, range.minPrice as minPrice
    FROM ${this.tableName}
    JOIN \`range\` ON product.range_id = range.id
    WHERE product.range_id = ?`;

    const result = await this.client.query(preparedQuery, [id]);
    if (!result) {
      return [];
    }
    return result;
  }
};