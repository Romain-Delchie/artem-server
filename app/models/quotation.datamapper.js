const CoreDatamapper = require('./core.datamapper');

module.exports = class Quotation extends CoreDatamapper {
  tableName = 'quotation';

  async findQuotationsByAccountId(id) {
    const preparedQuery =
      `SELECT
      quotation.id AS quotation_id,
      DATE_FORMAT(quotation.creation_date, '%d/%m/%Y') AS creation_date,
      DATE_FORMAT(quotation.expiration_date, '%d/%m/%Y') AS expiration_date,
      quotation.shipment AS shipment,
      quotation.reference AS reference,
      quotation.ordered AS ordered,
      address.id AS delivery_id,
      address.name_address AS name_address,
    address.street_address AS street_address,
    address.street_other AS street_other,
    address.zip_code AS zip_code,
    address.city AS city,
    address.country AS country,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', product.id,
            'reference', product.reference,
            'designation', product.designation,
            'price', product.price,
            'delivery_time', product.delivery_time,
            'weight', product.weight,
            'quantity', quotation_has_product.quantity,
            'quotation_has_product_id', quotation_has_product.id,
            'coeff', product.coeff,
            'minPrice', \`range\`.minPrice
          )
        )
        FROM product
        INNER JOIN quotation_has_product ON product.id = quotation_has_product.product_id
        INNER JOIN \`range\` ON product.range_id = range.id
        WHERE quotation_has_product.quotation_id = quotation.id
      ) AS products
    FROM ${this.tableName}
    LEFT JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id
    LEFT JOIN product ON product.id = quotation_has_product.product_id
    LEFT JOIN delivery ON delivery.id = quotation.delivery_id
    LEFT JOIN address ON quotation.delivery_id = address.id
      WHERE quotation.account_id = ?
      GROUP BY quotation.id`;

    const result = await this.client.query(preparedQuery, [id]);
    if (!result) {
      return [];
    }
    return result;
  }

  async findQuotationById(id) {
    const preparedQuery =
      `SELECT
      quotation.id AS quotation_id,
      DATE_FORMAT(quotation.creation_date, '%d/%m/%Y') AS creation_date,
      DATE_FORMAT(quotation.expiration_date, '%d/%m/%Y') AS expiration_date,
      quotation.shipment AS shipment,
      quotation.reference AS reference,
      quotation.ordered AS ordered,
      address.id AS delivery_id,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', product.id,
            'reference', product.reference,
            'designation', product.designation,
            'price', product.price,
            'delivery_time', product.delivery_time,
            'weight', product.weight,
            'quantity', quotation_has_product.quantity,
            'quotation_has_product_id', quotation_has_product.id
            )
            )
            FROM product
            INNER JOIN quotation_has_product ON product.id = quotation_has_product.product_id
            WHERE quotation_has_product.quotation_id = quotation.id
            ) AS products
            FROM ${this.tableName}
            LEFT JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id
            LEFT JOIN product ON product.id = quotation_has_product.product_id
            LEFT JOIN delivery ON delivery.id = quotation.delivery_id
            LEFT JOIN address ON quotation.delivery_id = address.id
            WHERE quotation.id = ?
            `;

    const result = await this.client.query(preparedQuery, [id]);
    const row = result[0];

    if (!row) {
      return null;
    }
    return row;
  }

  async findAllQuotations() {
    const preparedQuery =
      `SELECT
      quotation.id AS quotation_id,
      DATE_FORMAT(quotation.creation_date, '%d/%m/%Y') AS creation_date,
      DATE_FORMAT(quotation.expiration_date, '%d/%m/%Y') AS expiration_date,
      quotation.shipment AS shipment,
      quotation.reference AS reference,
      quotation.ordered AS ordered,
      address.id AS delivery_id,
      address.name_address AS name_address,
    address.street_address AS street_address,
    address.street_other AS street_other,
    address.zip_code AS zip_code,
    address.city AS city,
    address.country AS country,
    account.id AS account_id,
    account.profile_id AS account_profile_id,
    account.lastname AS account_name,
    account.company AS account_company,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', product.id,
            'reference', product.reference,
            'designation', product.designation,
            'price', product.price,
            'delivery_time', product.delivery_time,
            'weight', product.weight,
            'quantity', quotation_has_product.quantity,
            'quotation_has_product_id', quotation_has_product.id,
            'coeff', product.coeff,
            'minPrice', \`range\`.minPrice
          )
        )
        FROM product
        INNER JOIN quotation_has_product ON product.id = quotation_has_product.product_id
        INNER JOIN \`range\` ON product.range_id = range.id
        WHERE quotation_has_product.quotation_id = quotation.id
      ) AS products
    FROM ${this.tableName}
    LEFT JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id
    LEFT JOIN product ON product.id = quotation_has_product.product_id
    LEFT JOIN delivery ON delivery.id = quotation.delivery_id
    LEFT JOIN address ON quotation.delivery_id = address.id
    LEFT JOIN account ON quotation.account_id = account.id
      GROUP BY quotation.id`;

    const result = await this.client.query(preparedQuery);
    if (!result) {
      return [];
    }
    return result;
  }
};