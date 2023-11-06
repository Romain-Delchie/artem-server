
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../artem-website/dist/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Destination pour les fichiers PDF
        cb(null, '../artem-website/dist/technicalSheet');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Créez un middleware Multer en utilisant la configuration de stockage
const upload = multer({ storage: storage });

// Middleware Multer pour les fichiers PDF
const uploadPdf = multer({ storage: pdfStorage });

const uploadController = {
    async uploadImage(req, res) {
        try {
            // Utilisez le middleware Multer pour gérer le téléversement du fichier
            upload.single('image')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Erreur lors du téléversement du fichier' });
                } else if (err) {
                    return res.status(500).json({ error: 'Une erreur s\'est produite lors du téléversement du fichier' });
                }

                // Vérifiez si un fichier a été téléversé
                if (!req.file) {
                    return res.status(400).json({ error: 'Aucun fichier n\'a été téléversé' });
                }

                // Le fichier a été téléversé avec succès, vous pouvez maintenant accéder à ses informations
                const { originalname, filename, size } = req.file;

                // Faites ici ce que vous voulez avec le fichier téléversé, par exemple, stockez-le dans votre base de données ou effectuez d'autres opérations.

                // Répondez avec succès
                res.status(200).json({ message: 'Fichier téléversé avec succès', originalname, filename, size });
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors du téléversement du fichier :', error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors du téléversement du fichier' });
        }
    },

    async uploadPdf(req, res) {
        try {
            // Utilisez le middleware Multer pour gérer le téléversement du fichier PDF
            uploadPdf.single('pdf')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    console.log(err);
                    return res.status(400).json({ error: 'Erreur lors du téléversement du fichier PDF' });
                } else if (err) {
                    return res.status(500).json({ error: 'Une erreur s\'est produite lors du téléversement du fichier PDF' });
                }

                // Vérifiez si un fichier a été téléversé
                if (!req.file) {
                    return res.status(400).json({ error: 'Aucun fichier PDF n\'a été téléversé' });
                }

                // Le fichier a été téléversé avec succès, vous pouvez maintenant accéder à ses informations
                const { originalname, filename, size } = req.file;

                // Faites ici ce que vous voulez avec le fichier PDF téléversé, par exemple, stockez-le dans votre base de données ou effectuez d'autres opérations.

                // Répondez avec succès
                res.status(200).json({ message: 'Fichier PDF téléversé avec succès', originalname, filename, size });
            });
        } catch (error) {
            console.error('Une erreur s\'est produite lors du téléversement du fichier PDF :', error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors du téléversement du fichier PDF' });
        }
    },
};

module.exports = uploadController;