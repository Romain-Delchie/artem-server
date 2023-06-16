const ArtemError = require('../errors/artem-error');
const { product } = require('../models/index.datamapper');
const debug = require('debug')('artem:product.controller');

const productController = {

  async getProducts(req, res) {
    const products = await product.findAll();
    return res.json({ products });
    
  },

  async addProduct(req, res) {
    const newProduct = await product.create({ ...req.body });
    return res.status(201).json({ newProduct });
  },

  
  async getOneProduct(req, res) {
    const oneProduct = await product.findByPk(req.params.id);
    if (!oneProduct) {
        throw new ArtemError('Product not found', 404);
    }
    return res.json({ oneProduct });
    },

  async patchProduct(req, res) {
    const productToPatch = await product.findByPk(req.params.id);

    if (!productToPatch) {
      res.status(404).json({ product: null });
    }
    
    const patchedproduct = await product.update({ id: req.params.id, ...req.body });
    return res.json({ product: patchedproduct });
  },

  async deleteProduct(req, res) {
    const productToDelete = await product.findByPk(req.params.id);
    if (!productToDelete) {
        throw new ArtemError('Product not found', 404);
    }
    await product.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = productController;