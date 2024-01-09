const ArtemError = require('../errors/artem-error');
const { presentation } = require('../models/index.datamapper');
const debug = require('debug')('artem:presentation.controller');

const presentationController = {

    async getPresentations(req, res) {
        const presentations = await presentation.findAll();
        return res.json([...presentations]);

    },

    async addPresentation(req, res) {
        const newPresentation = await presentation.create({ ...req.body });
        return res.status(201).json({ newPresentation });
    },


    async getOnePresentation(req, res) {
        const onePresentation = await presentation.findByPk(req.params.id);
        if (!onePresentation) {
            throw new ArtemError('Presentation not found', 404);
        }
        return res.json({ onePresentation });
    },

    async patchPresentation(req, res) {
        const presentationToPatch = await presentation.findByPk(req.params.id);
        if (!presentationToPatch) {
            res.status(404).json({ presentation: null });
        }

        const patchedPresentation = await presentation.update({ id: req.params.id, ...req.body });
        return res.json({ patchedPresentation });
    },

    async deletePresentation(req, res) {
        const presentationToDelete = await presentation.findByPk(req.params.id);
        if (!presentationToDelete) {
            throw new ArtemError('Presentation not found', 404);
        }
        await presentation.delete(req.params.id);
        return res.status(204).json();
    },
};

module.exports = presentationController;