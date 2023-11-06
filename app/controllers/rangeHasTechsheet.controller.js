const ArtemError = require('../errors/artem-error');
const { rangeHasTechsheet } = require('../models/index.datamapper');

const rangeHasTechsheetController = {

    async getRangeHasTechsheets(req, res) {
        const rangeHasTechsheets = await rangeHasTechsheet.findAll();
        return res.json({ rangeHasTechsheets });
    },

    async addRangeHasTechsheet(req, res) {
        const newRangeHasTechsheet = await rangeHasTechsheet.create({ ...req.body });
        return res.status(201).json({ newRangeHasTechsheet });
    },

    async deleteRangeHasTechsheet(req, res) {
        const rangeHasTechsheetToDelete = await rangeHasTechsheet.findOneRHT({ ...req.query });
        if (!rangeHasTechsheetToDelete) {
            throw new ArtemError('RangeHasTechsheet not found', 404);
        }
        await rangeHasTechsheet.deleteOneRHT({ ...req.query });
        return res.status(204).json();
    }

}

module.exports = rangeHasTechsheetController;