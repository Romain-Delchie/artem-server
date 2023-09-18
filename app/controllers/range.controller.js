const ArtemError = require('../errors/artem-error');
const { range } = require('../models/index.datamapper');
const debug = require('debug')('artem:range.controller');

const rangeController = {

  async getRanges(req, res) {
    const ranges = await range.findAllRanges();
    return res.json({ ranges });

  },

  async addRange(req, res) {
    const newRange = await range.create({ ...req.body });
    return res.status(201).json({ newRange });
  },


  async getOneRange(req, res) {
    const oneRange = await range.findOneRange(req.params.id);
    if (!oneRange) {
      throw new ArtemError('Range not found', 404);
    }
    return res.json({ oneRange });
  },

  async patchRange(req, res) {
    const rangeToPatch = await range.findByPk(req.params.id);
    console.log(rangeToPatch)
    if (!rangeToPatch) {
      res.status(404).json({ range: null });
    }

    const patchedRange = await range.update({ id: req.params.id, ...req.body });
    return res.json({ product: patchedRange });
  },

  async deleteRange(req, res) {
    const rangeToDelete = await range.findByPk(req.params.id);
    if (!rangeToDelete) {
      throw new ArtemError('Range not found', 404);
    }
    await range.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = rangeController;