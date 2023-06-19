const CoreDatamapper = require('./core.datamapper');

module.exports = class Quotation extends CoreDatamapper {
  tableName = 'quotation';

  async findQuotationsByAccountId(id) {
    const preparedQuery = {
      text: `SELECT
      quotation.id as quotation_id,
      TO_CHAR(quotation.creation_date, 'DD/MM/YYYY') as creation_date,
      TO_CHAR(quotation.expiration_date, 'DD/MM/YYYY') as expiration_date,
      quotation.shipment as shipment,
      quotation.reference as reference,
      product.id AS product_id,
      delivery.id AS delivery_id,
      delivery.delivery_address AS delivery_address,
      product.reference AS product_reference,
      quotation_has_product.quantity AS quantity
      FROM ${this.tableName} 
      JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id 
      JOIN product ON product.id = quotation_has_product.product_id
      JOIN delivery ON delivery.id = quotation.delivery_id 
      WHERE quotation.account_id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return [];
    }
    return result.rows;
  }

  async findQuotationById(id) {
    const preparedQuery = {
      text: `SELECT
      quotation.id as quotation_id,
      TO_CHAR(quotation.creation_date, 'DD/MM/YYYY') as creation_date,
      TO_CHAR(quotation.expiration_date, 'DD/MM/YYYY') as expiration_date,
      quotation.shipment as shipment,
      quotation.reference as reference,
      product.id AS product_id,
      product.reference AS product_reference,
      delivery.id AS delivery_id,
      delivery.delivery_address AS delivery_adress,
      quotation_has_product.quantity AS quantity
      FROM ${this.tableName} 
      JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id 
      JOIN product ON product.id = quotation_has_product.product_id
      LEFT JOIN delivery ON delivery.id = quotation.delivery_id 
      WHERE quotation_id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    console.log(result.rows);
    if (!result.rows[0]) {
      return [];
    }
    return result.rows;
  }
};
