const CoreDatamapper = require('./core.datamapper');

module.exports = class Account extends CoreDatamapper {
  tableName = 'account';

  async findCompletelyAccount(id) {
    const preparedQuery =
      `SELECT
      account.id as id,
      account.company as company,
      account.firstname as firstname,
      account.lastname as lastname,
      account.email as email,
      account.verified as verified,
      account.email_token as email_token,
      account.phone_number as phone_number,
      account.role as role,
      account.profile_id as profile_id,
      ( SELECT
          JSON_OBJECT(
            'id', billing_address.id,
        'name_address', billing_address.name_address,
        'street_address', billing_address.street_address,
        'zip_code', billing_address.zip_code,
        'city', billing_address.city
        )
      FROM address AS billing_address
      WHERE account.billing_address_id = billing_address.id

    ) AS billing_address,
    JSON_OBJECT(
        'id', delivery_standard.id,
        'name_address', delivery_standard.name_address,
        'street_address', delivery_standard.street_address,
        'zip_code', delivery_standard.zip_code,
        'city', delivery_standard.city
    ) AS delivery_standard,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', delivery_address.id,
              'name_address', delivery_address.name_address,
              'street_address', delivery_address.street_address,
              'zip_code', delivery_address.zip_code,
              'city', delivery_address.city
          )
      ) AS deliveries
  FROM ${this.tableName}
  LEFT JOIN address AS billing_address ON account.billing_address_id = billing_address.id
  LEFT JOIN address AS delivery_standard ON account.delivery_standard_id = delivery_standard.id
  LEFT JOIN delivery ON account.id = delivery.account_id
  LEFT JOIN address AS delivery_address ON delivery.delivery_address_id = delivery_address.id
  WHERE account.id = ?`;
    const result = await this.client.query(preparedQuery, [id]);
    if (!result) {
      return [];
    }
    return result[0];
  }


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
      WHERE email = ? `;

    const result = await this.client.query(preparedQuery, [email]);
    if (!result[0]) {
      return null;
    }
    return result[0];
  }

  async findByEmailToken(emailToken) {
    const preparedQuery =
      `SELECT
      account.id as id,
      account.email as email,
      account.firstname as firstname,
      account.lastname as lastname,
      account.role as role
      FROM ${this.tableName}
      WHERE email_token = ?`;
    const result = await this.client.query(preparedQuery, [emailToken]);
    if (!result[0]) {
      return null;
    }
    return result[0];
  }

  async findByResetToken(resetToken) {
    const preparedQuery =
      `SELECT
      account.id as id,
      account.email as email,
      account.firstname as firstname,
      account.lastname as lastname,
      account.role as role
      FROM ${this.tableName}
      WHERE reset_token = ?`;
    const result = await this.client.query(preparedQuery, [resetToken]);
    if (!result[0]) {
      return null;
    }
    return result[0];
  }

};