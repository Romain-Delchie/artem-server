const pool = require('./pg.pool');
const Account = require('./account.datamapper');


module.exports = {
  account: new Account(pool)
};