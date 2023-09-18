const ArtemError = require('../errors/artem-error');
const { quotation } = require('../models/index.datamapper');
const debug = require('debug')('artem:quotation.controller');

const quotationController = {

  async getQuotations(req, res) {
    const quotations = await quotation.findQuotationsByAccountId(req.userId);  
    return res.json({ quotations });
  },

  async addQuotation(req, res) {
    const newQuotation = await quotation.create({ ...req.body });
    return res.status(201).json({ newQuotation });
  },

  
  async getOneQuotation(req, res) {
    const oneQuotation = await quotation.findQuotationById(req.params.id);
    if (!oneQuotation) {
        throw new ArtemError('Quotation not found', 404);
    }
    return res.json({ oneQuotation });
    },

  async patchQuotation(req, res) {
    const quotationToPatch = await quotation.findByPk(req.params.id);

    if (!quotationToPatch) {
      res.status(404).json({ quotation: null });
    }
    
    const patchedQuotation = await quotation.update({ id: req.params.id, ...req.body });
    return res.json({ quotation: patchedQuotation });
  },

  async deleteQuotation(req, res) {
    const quotationToDelete = await quotation.findByPk(req.params.id);
    if (!quotationToDelete) {
        throw new ArtemError('Quotation not found', 404);
    }
    await quotation.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = quotationController;