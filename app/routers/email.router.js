const express = require('express');
const ArtemError = require('../errors/artem-error');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { resetPassword } = require('../utils/mailing/resetPassword');
const { confirmationEmail } = require('../utils/mailing/confirmationEmail');
const { newUserEmail } = require('../utils/mailing/newUserEmail');
const { confirmationRoleValidate } = require('../utils/mailing/confirmationRoleValidate');
const { account } = require('../models/index.datamapper');




// Configuration de Nodemailer
const transporter = nodemailer.createTransport({

    host: 'smtp.office365.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

// Route pour envoyer un e-mail
emailRouter.post('/order', authMiddleware.checkToken, async (req, res) => {
    try {

        const { quote, company, email, phoneNumber, zipCode } = req.body;
        const products = quote.products
        const transport = quote.transport ? quote.transport : 0
        const clicli = quote.clicli ? quote.clicli : 0
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER, email,
            subject: `Commande Web de ${company} ${zipCode}`,
            html: `<h1>Commande de ${company} ${zipCode} du devis ${quote.quotation_id} via www.artem-fr.com</h1>
          
            <p>Adresse e-mail client : ${email}</p>
            <p>Numéro de téléphone client : ${phoneNumber}</p>
            <p>Produits : </p>
            ${products.map(product => `<p>${product.reference} - Quantité : ${product.quantity}</p>`)}
            <p>Montant HT : ${quote.total_price} €</p>
            <p>Montant transport HT : ${transport} €</p>
            <p>Montant livraison dépôt ou chez le client du client : ${clicli} €</p>
            <p>Montant total HT : ${quote.total_price + transport + clicli} €</p>
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

// Ajoutez le chemin vers le modèle EJS

// Route pour reset mdp
emailRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const accountUser = await account.findByEmail(email)
    if (!accountUser) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    account.update({ id: accountUser.id, reset_token: resetToken })

    const validationLink = `https://www.artem-fr.com/reset-password/${resetToken}`; // Remplacez par le vrai lien de validation

    try {

        const imageAttachment = {
            filename: 'logo1.jpg',
            path: 'images/logo1.jpg',
            cid: 'logo'
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Réinitialisation de votre mot de passe`,
            html: resetPassword(validationLink, accountUser.firstname),
            attachments: [imageAttachment],
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});

emailRouter.post('/validation', authMiddleware.checkToken, async (req, res) => {
    const { email, firstname, email_token } = req.body;
    const validationLink = `https://www.artem-fr.com/confirm-email/${email_token}`;

    try {
        const imageAttachment = {
            filename: 'logo1.jpg',
            path: 'images/logo1.jpg',
            cid: 'logo'
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Confirmation de votre adresse email`,
            html: confirmationEmail(validationLink, firstname),
            attachments: [imageAttachment],
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});

emailRouter.post('/new-user', async (req, res) => {
    try {
        const imageAttachment = {
            filename: 'logo1.jpg',
            path: 'images/logo1.jpg',
            cid: 'logo'
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            bcc: 'romain.delchie@artem-fr.com',
            subject: `Nouvel utilisateur sur le site Artem`,
            html: newUserEmail(),
            attachments: [imageAttachment],
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }

});

emailRouter.post('/role-validation', async (req, res) => {
    const { email, firstname } = req.body;
    try {
        const imageAttachment = {
            filename: 'logo1.jpg',
            path: 'images/logo1.jpg',
            cid: 'logo'
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Accès total au site Artem`,
            html: confirmationRoleValidate(firstname),
            attachments: [imageAttachment],
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }

});


module.exports = emailRouter;