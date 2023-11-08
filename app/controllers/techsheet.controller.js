const ArtemError = require('../errors/artem-error');
const { techsheet } = require('../models/index.datamapper');

const techsheetController = {

    async getTechsheets(req, res) {
        const techsheets = await techsheet.findAll();
        return res.json({ techsheets });
    },

    async addTechsheet(req, res) {
        const newTechsheet = await techsheet.create({ ...req.body });
        return res.status(201).json({ newTechsheet });
    },

    async deleteTechsheet(req, res) {
        const { id } = req.params;
        const techsheetToDelete = await techsheet.findByPk(id);
        if (!techsheetToDelete) {
            throw new ArtemError(404, 'Techsheet not found');
        }
        await techsheet.delete(id);
        return res.status(204).json();

    }

}

module.exports = techsheetController;