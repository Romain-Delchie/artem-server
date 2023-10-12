const pool = require('./mysql.pool');
const Account = require('./account.datamapper');
const Quotation = require('./quotation.datamapper');
const Product = require('./product.datamapper');
const Range = require('./range.datamapper');
const Delivery = require('./delivery.datamapper');
const Address = require('./address.datamapper');
const QuotationHasProduct = require('./quotationHasProduct.datamapper');
const Techsheet = require('./techsheet.datamapper');
const RangeHasTechsheet = require('./rangeHasTechsheet.datamapper');


module.exports = {
  account: new Account(pool),
  quotation: new Quotation(pool),
  product: new Product(pool),
  range: new Range(pool),
  delivery: new Delivery(pool),
  address: new Address(pool),
  quotationHasProduct: new QuotationHasProduct(pool),
  techsheet: new Techsheet(pool),
  rangeHasTechsheet: new RangeHasTechsheet(pool),
};