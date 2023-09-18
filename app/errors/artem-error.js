module.exports = class Artemerror extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'ArtemError';
      this.status = status;
    }
  };