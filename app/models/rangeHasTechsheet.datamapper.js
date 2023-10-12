const CoreDatamapper = require('./core.datamapper');

module.exports = class RangeHasTechsheet extends CoreDatamapper {
    tableName = 'range_has_techSheet';

    async findOneRHT(data) {
        const preparedQuery = `SELECT * FROM ${this.tableName} WHERE range_id = ? AND techSheet_id = ?`;
        const result = await this.client.query(preparedQuery, [data.range_id, data.techsheet_id]);
        if (!result[0]) {
            return null;
        }
        return result[0];
    }

    async deleteOneRHT(data) {
        const preparedQuery = `DELETE FROM ${this.tableName} WHERE range_id = ? AND techSheet_id = ?`;
        await this.client.query(preparedQuery, [data.range_id, data.techsheet_id]);
        const lastPreparedQuery = `SELECT * FROM ${this.tableName} WHERE range_id = ? AND techSheet_id = ?`;
        const tryResult = await this.client.query(lastPreparedQuery, [data.range_id, data.techsheet_id]);
        return tryResult;
    }

}