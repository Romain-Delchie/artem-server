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
    const accountConnected = await account.findCompletelyAccount(userId);
    delete accountConnected.password;

    if (!accountConnected) {
      return res.status(404).json({ account: null });
    }
    return res.json(accountConnected);
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
      'billing_address_id',
      'delivery_standard_id',
      'siret',
      'role',
      'company',
      'profile_id',


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
    if (deletedAccount.length === 0) {
      return res.status(204).end();
    }
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = accountController;