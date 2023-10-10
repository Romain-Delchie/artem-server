
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../artem-website/public/images/products');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    },
});

// Créez un middleware Multer en utilisant la configuration de stockage
const upload = multer({ storage: storage });

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
};

module.exports = uploadController;