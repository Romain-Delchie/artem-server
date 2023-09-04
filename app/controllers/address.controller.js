const ArtemError = require('../errors/artem-error');
const { address } = require('../models/index.datamapper');
const debug = require('debug')('artem:address.controller');

const addressController = {

    async getAddresses(req, res) {
        const addresses = await address.findAll();
        return res.json({ addresses });
    },

    async addAddress(req, res) {
        const newAddress = await address.create({ ...req.body });
        return res.status(201).json({ newAddress });
    },


    async getOneAddress(req, res) {
        const oneAddress = await address.findByPk(req.params.id);
        if (!oneAddress) {
            throw new ArtemError('Address not found', 404);
        }
        return res.json({ oneAddress });
    },

    async patchAddress(req, res) {
        const addressToPatch = await address.findByPk(req.params.id);

        if (!addressToPatch) {
            res.status(404).json({ address: null });
        }

        const patchedAddress = await address.update({ id: req.params.id, ...req.body });
        return res.json({ address: patchedAddress });
    },

    async deleteAddress(req, res) {
        const addressToDelete = await address.findByPk(req.params.id);
        if (!addressToDelete) {
            throw new ArtemError('Address not found', 404);
        }
        await address.delete(req.params.id);
        return res.status(204).json();
    },
};

module.exports = addressController;