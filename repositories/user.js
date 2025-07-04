const Database = require('../database/connection');
const User = require('../models/user');
class UserRepository {

    static async findByEmail(email, tipovalidacion) {
        try {
            const result = await Database.query('SELECT * FROM users WHERE email = $1', [email]);
            console.log(result.rows[0]);
            if (tipovalidacion == 1) {
                if (result.rows[0] != undefined) {
                    throw new Error("El usuario Ya existe");
                }
            } else if (tipovalidacion == 2) {
                if (result.rows[0] != undefined) {
                    return result.rows[0] ? new User(result.rows[0]) : null;
                } else {
                    throw new Error("El usuario No existe");
                }

            }
            //return result.rows[0] ? new User(result.rows[0]) : null;


        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        try {
            const result = await Database.query(
                `INSERT INTO users (name, email, password,uperfil, created_at) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
                [userData.name, userData.email, userData.password, userData.perfil, new Date()]
            );

            const user = result.rows[0];

            return selectFields(user, ['id', 'name', 'email', 'uperfil', 'created_at']);
        } catch (error) {
            throw error;
        }
    }


    static async findById(id) {
        try {

            const result = await Database.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = result.rows[0];


            return {
                id: user.id,
                name: user.name,
                email: user.email,
                perfil: user.uperfil,
                created_at: user.created_at
            };

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async update(id, userData) {
        try {
            // password = $3 userData.password
            const result = await Database.query(
                `UPDATE users 
                 SET name = $1, email = $2, updated_at = NOW() 
                 WHERE id = $3 
                 RETURNING *`,
                [userData.name, userData.email, id]
            );
            
  
            return result.rows[0] ? new User(result.rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = UserRepository;