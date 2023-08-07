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
      delivery.id AS delivery_id,
      delivery.delivery_address AS delivery_address,
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
      delivery.id AS delivery_id,
      delivery.delivery_address AS delivery_address,
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
            WHERE quotation.id = ?
            `;

    const result = await this.client.query(preparedQuery, [id]);
    const row = result[0];

    if (!row) {
      return null;
    }
    return row;
  }
};
// SELECT
//       quotation.id AS quotation_id,
//       DATE_FORMAT(quotation.creation_date, '%d/%m/%Y') AS creation_date,
//       DATE_FORMAT(quotation.expiration_date, '%d/%m/%Y') AS expiration_date,
//       quotation.shipment AS shipment,
//       quotation.reference AS reference,
//       delivery.id AS delivery_id,
//       delivery.delivery_address AS delivery_address,
//       GROUP_CONCAT(quotation_has_product.quantity) AS quantities,
//       (
//         SELECT JSON_ARRAYAGG(
//           JSON_OBJECT(
//             id, product.id,
//             'reference', product.reference,
//             'price', product.price,
//             'delivery_time', product.delivery_time,
//             'weight', product.weight
//           )
//         )
//         FROM product
//         INNER JOIN quotation_has_product ON product.id = quotation_has_product.product_id
//         WHERE quotation_has_product.quotation_id = quotation.id
//       ) AS products
//     FROM ${this.tableName}
//     LEFT JOIN quotation_has_product ON quotation.id = quotation_has_product.quotation_id
//     LEFT JOIN product ON product.id = quotation_has_product.product_id
//     LEFT JOIN delivery ON delivery.id = quotation.delivery_id
//     WHERE quotation.id = ?
//     GROUP BY quotation.id, quotation.creation_date, quotation.expiration_date, quotation.shipment, quotation.reference, delivery.id, delivery.delivery_address, quotation_has_product.quantity;