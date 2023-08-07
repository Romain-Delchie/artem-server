const CoreDatamapper = require('./core.datamapper');

module.exports = class quotationHasProduct extends CoreDatamapper {
    tableName = 'quotation_has_product';

    async findProductsFromQuotation(quotationId) {
        const preparedQuery =
            `SELECT * FROM ${this.tableName}
            WHERE quotation_id = ?`;
        const [rows] = await this.client.query(preparedQuery, [quotationId]);
        if (!rows) {
            return [];
        }
        return rows;
    }
}