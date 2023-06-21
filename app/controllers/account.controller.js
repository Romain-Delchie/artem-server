const { account } = require('../models/index.datamapper');
const buildParamObject = require('../utils/build-param-object');
const { hashPassword } = require('../utils/password');

const debug = require('debug')('app:accountController');

const accountController = {

  /**
   * @summary Récupère les infos de profil de l'utilisateur connecté
   */
  async getAccount(req, res) {
    const { userId } = req;
     const account = await account.findByPk(userId);
      delete account.password;

    if (!account) {
      return res.status(404).json({ account: null });
    }
    return res.json(account);
  },

    /**
   * @summary Crait un compte utilisateur
   */
  async addAccount(req, res) {
    const newAccount = await account.create({ ...req.body });
    return res.status(201).json({ newAccount });
  },

  /**
   * @summary Met à jour les infos du compte de l'utilisateur connecté
   */
  async updateAccount(req, res) {
    const { userId } = req;
    const inputData = req.body;
    let updatedAccount;

    const accountFields = [
      'firstname',
      'lastname',
      'email',
      'password',
      'phone_number',
      'invoice_address',
      'company',
    ];
    // Données du compte à mettre à jour
    const accountData = buildParamObject(accountFields, inputData);

    // si le mot de passe est présent dans le body
    // on le hash et on supprime le repeat_password
    if ('password' in accountData) {
      accountData.password = await hashPassword(accountData.password);
      delete accountData.repeat_password;
    }

    // Si il y a des données à mettre à jour dans la table account
    if (Object.keys(accountData).length !== 0) {
      updatedAccount = await account.update({ id: userId, ...accountData });
      delete updatedAccount.password;
    }



    // On retourne les données mises à jour
    return res.json({ ...updatedAccount });
  },

  async deleteAccount(req, res) {
    const { userId } = req;
    const deletedAccount = await account.delete(userId);
    if (deletedAccount) {
      return res.status(204).end();
    }
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = accountController;