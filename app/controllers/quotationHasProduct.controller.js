const ArtemError = require('../errors/artem-error');
const { quotationHasProduct } = require('../models/index.datamapper');
const debug = require('debug')('artem:quotationHasProduct.controller');

const quotationHasProductController = {
    async getQuotationHasProduct(req, res) {
        const quotationHasProduct = await quotationHasProduct.findAll();
        return res.json({ quotationHasProduct });
    },

    async addQuotationHasProduct(req, res) {
        const newQuotationHasProduct = await quotationHasProduct.create({ ...req.body });
        return res.status(201).json({ newQuotationHasProduct });
    },

    async getProductsFromQuotation(req, res) {
        const productsFromQuotation = await quotationHasProduct.findProductsFromQuotation(req.params.id);
        if (!productsFromQuotation) {
            throw new ArtemError('Quotation not found', 404);
        }
        return res.json({ productsFromQuotation });
    },

    async patchQuotationHasProduct(req, res) {
        const quotationHasProductToPatch = await quotationHasProduct.findByPk(req.params.id);

        if (!quotationHasProductToPatch) {
            res.status(404).json({ quotationHasProduct: null });
        }

        const patchedQuotationHasProduct = await quotationHasProduct.update({ id: req.params.id, ...req.body });
        return res.json({ quotationHasProduct: patchedQuotationHasProduct });
    },

    async deleteQuotationHasProduct(req, res) {
        const quotationHasProductToDelete = await quotationHasProduct.findByPk(req.params.id);
        if (!quotationHasProductToDelete) {
            throw new ArtemError('Quotation not found', 404);
        }
        await quotationHasProduct.delete(req.params.id);
        return res.status(204).json();
    }
};

module.exports = quotationHasProductController;