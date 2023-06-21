// C'est ici que l'on va définir l'ensemble de méthode de CRUD permettant de gérer les données des
// différentes table de notre BDD
module.exports = class CoreDatamapper {
    tableName;
  
    // Afin de pouvoir ecexuter nos requête SQL, il faut avant tout se préoccuper de récupérer le
    // client injecter aux modèles
    constructor(client) {
      this.client = client;
    }
  
    /**
       * Récupération par identifiant
       * @param {number} id identifiant
       * @returns {object} un enregistrement
       */
    async findByPk(id) {
      const preparedQuery = 
        `SELECT * FROM ${this.tableName} WHERE id = ?`;
        

  
      const result = await this.client.query(preparedQuery, [id]);
  
      if (!result[0]) {
        return null;
      }
  
      return result[0];
    }
  
    /**
       * Permet de récupérer l'ensemble des enregistrement d'une table ou une liste d'enregistrement.
       * @returns {object[]} une liste d'enregistrements
       */
    async findAll() {
      const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
      return result;
    }
  
    /**
       * Insertion de données dans la table
       * @param {object} inputData données à insérer dans la table
       * @returns {object} l'enregistrement créé
       */
    async create(inputData) {
      const fields = [];
      const placeholders = [];
      const values = [];
      const nameCreated = [];
  
      Object.entries(inputData).forEach(([prop, value]) => {
        fields.push(`${prop}`);
        if (prop === "firstname" || prop === "lastname") {
          nameCreated.push(`${value}`);
        }
        placeholders.push(`?`);
        values.push(value);
      });
      const preparedQuery = 
        `
          INSERT INTO ${this.tableName}
          (${fields})
          VALUES (${placeholders})
        `;
      await this.client.query(preparedQuery, values);
      return inputData;
    }
  
    /**
       * Modification de données dans la table
       * @param {object} param0 données à mettre à jour dans la table comprenant également
       * l'identifiant de l'enregistrement
       * @returns {object} l'enregistrement mis à jour
       */
    async update({ id, ...inputData }) {
      const fields = [];
      const values = [];
  
      Object.entries(inputData).forEach(([prop, value]) => {
        fields.push(`${prop} = ?`);
        values.push(value);
      });
  
      values.push(id);
  
      const preparedQuery = `
          UPDATE ${this.tableName} SET
          ${fields}
          WHERE id = ?
          
        `;
      
      await this.client.query(preparedQuery, values);
      const updatedData = await this.client.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
      delete updatedData[0].password;
      return updatedData[0];
    }
  
    /**
       * Suppression d'un enregistrement
       * @param {number} id
       * @returns {boolean} nombre d'enregistrement supprimés
      */
    async delete(id) {
     await this.client.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  const tryResult = await this.client.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
  return tryResult;
}
  };