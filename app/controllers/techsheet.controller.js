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
    }

}

module.exports = techsheetController;