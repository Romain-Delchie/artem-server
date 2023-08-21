const express = require('express');
const nodemailer = require('nodemailer');
const emailOrderRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({

    service: 'Outlook365',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

// Route pour envoyer un e-mail
emailOrderRouter.post('/', authMiddleware.checkToken, async (req, res) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `commande de ${req.body.company}`,
            text: req.body.order
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});

module.exports = emailOrderRouter;