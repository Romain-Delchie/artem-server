const express = require('express');
const nodemailer = require('nodemailer');
const emailOrderRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

// Route pour envoyer un e-mail
emailOrderRouter.post('/', authMiddleware.checkToken, async (req, res) => {
    try {

        const { quote, company, email, phoneNumber, zipCode } = req.body;
        const products = quote.products
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Commande Web de ${company} ${zipCode}`,
            html: `<h1>Commande de ${company} ${zipCode} du devis ${quote.quotation_id} via www.artem-fr.com</h1>
          
            <p>Adresse e-mail client : ${email}</p>
            <p>Numéro de téléphone client : ${phoneNumber}</p>
            <p>Produits : </p>
            ${products.map(product => `<p>${product.reference} - Quantité : ${product.quantity}</p>`)}
            <p>Montant HT : ${quote.total_price} €</p>
            <p>Montant transport HT : ${quote.transport} €</p>
            <p>Montant livraison dépôt ou chez le client du client : ${quote.clicli} €</p>
            <p>Montant total HT : ${quote.total_price + quote.transport + quote.clicli} €</p>
            <p>Délai: au plus tôt</p>
            
            <p>Adresse de livraison :</p>
            <p>${quote.name_address}</p>
            <p>${quote.street_address}</p>
            <p>${quote.zip_code} ${quote.city}</p>
        `

        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});

module.exports = emailOrderRouter;