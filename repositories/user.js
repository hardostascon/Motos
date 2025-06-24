const Database = require('../database/connection');
const User = require('../models/user');
class UserRepository {

    static async findByEmail(email) {
    try {
      const result = await Database.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log(result.rows[0]);
      //return result.rows[0] ? new User(result.rows[0]) : null;
      if (result.rows[0]!=undefined){
          throw new Error("El usuario Ya existe");
      }
      
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;