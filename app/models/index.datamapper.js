const pool = require('./pg.pool');
const Account = require('./account.datamapper');
const Quotation = require('./quotation.datamapper');
const Product = require('./product.datamapper');
const Range = require('./range.datamapper');


module.exports = {
  account: new Account(pool),
  quotation: new Quotation(pool),
  product: new Product(pool),
  range: new Range(pool)
};