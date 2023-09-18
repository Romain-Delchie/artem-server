const bcrypt = require('bcrypt');

module.exports = {
  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
    );
    return hashedPassword;
  },

  async checkPassword(password, hashedPassword) {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
  },
};