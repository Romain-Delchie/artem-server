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
const { log } = require('console');

// Fonction pour sécuriser les données avant de les mettre dans du HTML
const escapeHtml = (value = '') => {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


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
        const transport = quote.transport ? quote.transport === "Nous consulter" ? "Port" : quote.transport : 0
        const clicli = quote.clicli ? quote.clicli : 0
        const total = transport === "Port" ? (quote.totalPrice).toFixed(2) + " + Port" : (quote.totalPrice).toFixed(2)
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: `${process.env.EMAIL_RECEIVER}, ${email}, commande@artem-fr.com`,
          subject: `Commande Web de ${company} ${zipCode}`,
          html: `<h1>Commande de ${company} ${zipCode} du devis ${quote.quotation_id} via www.artem-fr.com</h1>
          
            <p>Adresse e-mail client : ${email}</p>
            <p>Numéro de téléphone client : ${phoneNumber}</p>
            <p>Référence : ${quote.reference}</p>
            <p>Produits : </p>
            ${products.map((product) => `<p>${product.reference} - Quantité : ${product.quantity} - PUHT : ${product.priceWithCoeff}</p>`)}
            <p>Montant transport HT : ${transport} €</p>
            <p>Montant livraison dépôt ou chez le client du client : ${clicli} €</p>
            <p>Montant total HT : ${total} €</p>
            <p>Délai: au plus tôt</p>
            
            <p>Adresse de livraison :</p>
            <p>${quote.name_address}</p>
            <p>${quote.street_address}</p>
            <p>${quote.zip_code} ${quote.city}</p>
        `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
    }
});



// Route pour envoyer le message du formulaire de contact
emailRouter.post('/contact', async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            phone,
            message
        } = req.body;


        // ==========================================
        // 1. VALIDATION
        // ==========================================

        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Les champs nom, email et message sont obligatoires'
            });
        }

        // Nettoyage des espaces inutiles
        const cleanName = String(name).trim();
        const cleanCompany = String(company || '').trim();
        const cleanEmail = String(email).trim();
        const cleanPhone = String(phone || '').trim();
        const cleanMessage = String(message).trim();


        // Vérification de l'adresse email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                error: 'Adresse email invalide'
            });
        }


        // Limitation de la taille des champs
        if (cleanName.length > 100) {
            return res.status(400).json({
                error: 'Le nom est trop long'
            });
        }

        if (cleanCompany.length > 150) {
            return res.status(400).json({
                error: 'Le nom de la société est trop long'
            });
        }

        if (cleanEmail.length > 254) {
            return res.status(400).json({
                error: 'L\'adresse email est trop longue'
            });
        }

        if (cleanPhone.length > 30) {
            return res.status(400).json({
                error: 'Le numéro de téléphone est trop long'
            });
        }

        if (cleanMessage.length > 5000) {
            return res.status(400).json({
                error: 'Le message est trop long'
            });
        }


        // ==========================================
        // 2. ÉCHAPPEMENT HTML
        // ==========================================

        const safeName = escapeHtml(cleanName);
        const safeCompany = escapeHtml(cleanCompany);
        const safeEmail = escapeHtml(cleanEmail);
        const safePhone = escapeHtml(cleanPhone);
        const safeMessage = escapeHtml(cleanMessage)
            .replace(/\r?\n/g, '<br>');


        // ==========================================
        // 3. EMAIL POUR ARTEM
        // ==========================================

        const mailToArtem = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            replyTo: cleanEmail,

            subject: `Nouveau message de contact - ${cleanName}`,

            html: `
                <h1>Nouveau message depuis le formulaire de contact</h1>

                <p>
                    <strong>Nom :</strong> ${safeName}
                </p>

                <p>
                    <strong>Société :</strong>
                    ${safeCompany || 'Non renseignée'}
                </p>

                <p>
                    <strong>Email :</strong> ${safeEmail}
                </p>

                <p>
                    <strong>Téléphone :</strong>
                    ${safePhone || 'Non renseigné'}
                </p>

                <h2>Message :</h2>

                <p>
                    ${safeMessage}
                </p>

                <hr>

                <p>
                    Message envoyé depuis le formulaire de contact
                    de www.artem-fr.com
                </p>
            `
        };


        // Envoi du message principal
        await transporter.sendMail(mailToArtem);


        // ==========================================
        // 4. EMAIL DE CONFIRMATION AU CLIENT
        // ==========================================

        try {

            const mailToClient = {
                from: process.env.EMAIL_USER,
                to: cleanEmail,

                subject: 'Confirmation de votre demande - Artem',

                html: `
                    <h1>Bonjour,</h1>

                    <p>
                        Nous avons bien reçu votre message et vous en remercions.
                    </p>

                    <p>
                        Notre équipe va prendre connaissance de votre demande
                        et reviendra vers vous dans les meilleurs délais.
                    </p>

                    <hr>

                    <h2>Récapitulatif de votre demande</h2>

                    <p>
                        <strong>Nom :</strong> ${safeName}
                    </p>

                    <p>
                        <strong>Société :</strong>
                        ${safeCompany || 'Non renseignée'}
                    </p>

                    <p>
                        <strong>Email :</strong> ${safeEmail}
                    </p>

                    <p>
                        <strong>Téléphone :</strong>
                        ${safePhone || 'Non renseigné'}
                    </p>

                    <h3>Votre message :</h3>

                    <p>
                        ${safeMessage}
                    </p>

                    <hr>

                    <p>
                        Cordialement,<br>
                        <strong>L'équipe Artem</strong>
                    </p>

                    <p>
                        <a href="https://www.artem-fr.com">
                            www.artem-fr.com
                        </a>
                    </p>
                `
            };


            await transporter.sendMail(mailToClient);

        } catch (confirmationError) {

            // Le mail Artem a bien été envoyé.
            // Si l'accusé de réception échoue, on ne considère
            // pas la demande comme échouée.

            console.error(
                "Le message a été envoyé à Artem, mais l'accusé de réception client a échoué :",
                confirmationError
            );
        }


        // ==========================================
        // 5. RÉPONSE AU FRONTEND
        // ==========================================

        return res.status(200).json({
            message: 'Message envoyé avec succès'
        });


    } catch (error) {

        console.error(
            "Erreur lors de l'envoi du message de contact :",
            error
        );

        return res.status(500).json({
            error: "Erreur lors de l'envoi de l'e-mail"
        });
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
