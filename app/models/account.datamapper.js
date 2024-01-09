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
      account.country as country,
      account.role as role,
      account.profile_id as profile_id,
      ( SELECT
          JSON_OBJECT(
            'id', billing_address.id,
        'name_address', billing_address.name_address,
        'street_address', billing_address.street_address,
        'street_other', billing_address.street_other,
        'zip_code', billing_address.zip_code,
        'city', billing_address.city,
        'country', billing_address.country
        )
      FROM address AS billing_address
      WHERE account.billing_address_id = billing_address.id

    ) AS billing_address,
    JSON_OBJECT(
        'id', delivery_standard.id,
        'name_address', delivery_standard.name_address,
        'street_address', delivery_standard.street_address,
        'street_other', delivery_standard.street_other,
        'zip_code', delivery_standard.zip_code,
        'city', delivery_standard.city,
        'country', delivery_standard.country
    ) AS delivery_standard,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', delivery_address.id,
              'name_address', delivery_address.name_address,
              'street_address', delivery_address.street_address,
              'street_other', delivery_address.street_other,
              'zip_code', delivery_address.zip_code,
              'city', delivery_address.city,
              'country', delivery_address.country
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

  async findAllCompletelyAccount() {
    const preparedQuery =
      `SELECT
      account.id as id,
      account.company as company,
      account.firstname as firstname,
      account.lastname as lastname,
      account.email as email,
      account.verified as verified,
      account.phone_number as phone_number,
      account.role as role,
      account.siret as siret,
      DATE_FORMAT(account.last_connection, '%d/%m/%Y') as last_connection,
      billing_address.id as billing_address_id,
      billing_address.name_address as billing_name_address,
      billing_address.street_address as billing_street_address,
      billing_address.street_other as billing_street_other,
      billing_address.zip_code as billing_zip_code,
      billing_address.city as billing_city,
      billing_address.country as billing_country,
      profile.id as profile_id,
      profile.name as profile_name      
  FROM ${this.tableName}
  LEFT JOIN address AS billing_address ON account.billing_address_id = billing_address.id
  LEFT JOIN profile ON account.profile_id = profile.id
  GROUP BY account.id`;
    const result = await this.client.query(preparedQuery);
    if (!result) {
      return [];
    }
    return result;
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

  async findAllAccountToValidate() {
    const preparedQuery =
      `SELECT
      account.id as id,
      account.email as email,
      account.firstname as firstname,
      account.lastname as lastname,
      account.phone_number as phone_number,
      account.company as company,
      account.siret as siret,
      account.billing_address_id as billing_address_id,
      account.role as role
      FROM ${this.tableName}
      WHERE profile_id = ?`;
    const result = await this.client.query(preparedQuery, [3]);
    if (!result[0]) {
      return null;
    }
    return result;
  }

};