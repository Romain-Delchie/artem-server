const CoreDatamapper = require('./core.datamapper');

module.exports = class Range extends CoreDatamapper {
  tableName = '`range`';

  async findAllRanges() {
    const preparedQuery =
      `SELECT
      r.*,
      (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name, 'link', t.link, 'description', 'rt.name'))
          FROM techSheet AS t
          INNER JOIN range_has_techSheet AS rt ON t.id = rt.techSheet_id
          WHERE rt.range_id = r.id
      ) AS techSheets
FROM ${this.tableName} AS r`
    const result = await this.client.query(preparedQuery);
    if (!result) {
      return [];
    }
    return result;
  }

  async findOneRange(id) {
    const preparedQuery =
      `SELECT
      *,
      (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name, 'link', t.link, 'description', rt.name))
          FROM techSheet AS t
          INNER JOIN range_has_techSheet AS rt ON t.id = rt.techSheet_id
          WHERE rt.range_id = r.id
      ) AS techSheets
FROM ${this.tableName} AS r
WHERE r.id = ?`
    const result = await this.client.query(preparedQuery, [id]);
    const row = result[0];

    if (!row) {
      return null;
    }
    return row;
  }
}