const CoreDatamapper = require('./core.datamapper');

module.exports = class Delivery extends CoreDatamapper {
  tableName = 'delivery';

  async findDeliveriesByAccountId(id) {
    const preparedQuery = {
      text: `SELECT
      delivery.id as delivery_id,
      delivery.delivery_address as delivery_address,
      account.id as account_id
      FROM ${this.tableName} 
      JOIN account ON account.id = delivery.account_id
      WHERE delivery.account_id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return [];
    }
    return result.rows;
  }

  async findDeliveryById(id) {
    const preparedQuery = {
      text: `SELECT
      delivery.id as delivery_id,
      delivery.delivery_address as delivery_address,
      account.id as account_id
      FROM ${this.tableName} 
      JOIN account ON account.id = delivery.account_id
      WHERE delivery.id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return [];
    }
    return result.rows;
  }
};
