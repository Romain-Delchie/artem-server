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

  async getAllAccounts(req, res) {
    const allAccounts = await account.findAllCompletelyAccount();
    return res.json(allAccounts);
  },


  /**
   * @summary Met à jour les infos du compte de l'utilisateur connecté
   */
  async updateAccount(req, res) {
    const userId = req.body.idToValidate ? req.body.idToValidate : req.userId;
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
  },

  async verifyEmail(req, res) {
    const { code } = req.body;
    console.log(typeof code);
    const verified = await account.findByEmailToken(code);
    console.log(verified);

    if (verified) {
      account.update({ id: verified.id, verified: true });
      return res.json({ message: 'Email vérifié' });
    } else {
      return res.status(403).json({ message: 'Code invalide' });
    }
  },

  async updatePassword(req, res) {
    const { password, code } = req.body;
    console.log(password);
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const accountToUpdate = await account.findByResetToken(code);
    if (accountToUpdate) {
      account.update({ id: accountToUpdate.id, password: hashedPassword });
      return res.json({ message: 'Mot de passe mis à jour' });
    } else {
      return res.status(403).json({ message: 'Code invalide' });
    }

  },

  async findByResetToken(req, res) {
    const { token } = req.params;
    const accountToFind = await account.findByResetToken(token);
    if (accountToFind) {
      return res.json({ ...accountToFind });
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  },

  async findAccountToValidate(req, res) {
    const { token } = req.params;
    const accountToValidate = await account.findAllAccountToValidate(token);
    if (accountToValidate) {
      return res.json(accountToValidate);
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  }

};

module.exports = accountController;