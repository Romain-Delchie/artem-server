const ArtemError = require('../errors/artem-error');
const { delivery } = require('../models/index.datamapper');
const debug = require('debug')('artem:delivery.controller');

const deliveryController = {

  async getDeliveries(req, res) {
    const deliveries = await delivery.findDeliveriesByAccountId(req.userId);  
    return res.json({ deliveries });
  },

  async addDelivery(req, res) {
    const newDelivery = await delivery.create({ ...req.body });
    return res.status(201).json({ newDelivery });
  },

  
  async getOneDelivery(req, res) {
    const oneDelivery = await delivery.findDeliveryById(req.params.id);
    if (!oneDelivery) {
        throw new ArtemError('Delivery not found', 404);
    }
    return res.json({ oneDelivery });
    },

  async patchDelivery(req, res) {
    const deliveryToPatch = await delivery.findByPk(req.params.id);

    if (!deliveryToPatch) {
      res.status(404).json({ delivery: null });
    }
    
    const patchedDelivery = await delivery.update({ id: req.params.id, ...req.body });
    return res.json({ delivery: patchedDelivery });
  },

  async deleteDelivery(req, res) {
    const deliveryToDelete = await delivery.findByPk(req.params.id);
    if (!deliveryToDelete) {
        throw new ArtemError('Delivery not found', 404);
    }
    await delivery.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = deliveryController;