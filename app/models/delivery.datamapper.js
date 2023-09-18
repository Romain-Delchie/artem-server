const CoreDatamapper = require('./core.datamapper');

module.exports = class Delivery extends CoreDatamapper {
  tableName = 'delivery';

  async findDeliveriesByAccountId(id) {
    const preparedQuery =
      `SELECT
      delivery.id as delivery_id,
      delivery.delivery_address_id as delivery_address_id,
      account.id as account_id
      FROM ${this.tableName} 
      JOIN account ON account.id = delivery.account_id
      WHERE delivery.account_id = ?`;

    const result = await this.client.query(preparedQuery, [id]);
    if (!result) {
      return [];
    }
    return result;
  }

  async findDeliveryById(id) {
    const preparedQuery =
      `SELECT
      delivery.id as delivery_id,
      delivery.delivery_address_id as delivery_address_id,
      account.id as account_id
      FROM ${this.tableName} 
      JOIN account ON account.id = delivery.account_id
      WHERE delivery.id = ?`;

    const result = await this.client.query(preparedQuery, [id]);
    const row = result[0];

    if (!row) {
      return null;
    }
    return row;
  }
};
