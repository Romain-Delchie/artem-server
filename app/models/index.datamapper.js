const pool = require('./mysql.pool');
const Account = require('./account.datamapper');
const Quotation = require('./quotation.datamapper');
const Product = require('./product.datamapper');
const Range = require('./range.datamapper');
const Delivery = require('./delivery.datamapper');
const QuotationHasProduct = require('./quotationHasProduct.datamapper');


module.exports = {
  account: new Account(pool),
  quotation: new Quotation(pool),
  product: new Product(pool),
  range: new Range(pool),
  delivery: new Delivery(pool),
  quotationHasProduct: new QuotationHasProduct(pool),
};