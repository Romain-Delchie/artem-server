const pool = require('./pg.pool');
const Account = require('./account.datamapper');
const Quotation = require('./quotation.datamapper');
const CoreDatamapper = require('./core.datamapper');
const Product = require('./product.datamapper');


module.exports = {
  account: new Account(pool),
  quotation: new Quotation(pool),
  product: new Product(pool),
};