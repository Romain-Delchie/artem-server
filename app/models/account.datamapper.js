const CoreDatamapper = require('./core.datamapper');

module.exports = class Account extends CoreDatamapper {
  tableName = 'account';

  async findByEmail(email) {

    const preparedQuery = 
      `SELECT
      account.id as id,
      account.email as email,
      account.company as company,
      account.firstname as firstname,
      account.lastname as lastname,
      account.role as role,
      account.password as password,
      account.profile_id as profile_id
      FROM ${this.tableName}
      LEFT JOIN profile ON profile.id = account.profile_id
      WHERE email = ?`;
    

      const result = await this.client.query(preparedQuery, [email]);

    
    if (!result[0]) {
      return null;
    }
    return result[0];
  }
};