const Database = require('../database/connection');
const User = require('../models/marcas');
const selectFields = require("../helpers/selectFields");
class MarcaRepository {
    static async create(MarcaData) {
        try {
            const result = await Database.query(
                `INSERT INTO marca (marca_nombre, marca_descripcion, created_at) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
                [MarcaData.marca_nombre, MarcaData.marca_descripcion, new Date()]
            );

            const user = result.rows[0];

            return selectFields(user, ['id', 'marca_nombre', 'marca_descripcion', 'marca_imagen', 'created_at']);
        } catch (error) {
            throw error;
        }
    }



    static async findByMarca(marca_codigo) {
        try {
            const result = await Database.query('SELECT * FROM marca WHERE id = $1', [marca_codigo]);
            console.log(result.rows[0]);

            return result.rows[0] ? new User(result.rows[0]) : null;


        } catch (error) {
            throw error;
        }
    }


    static async updateFileMarca(id, archivo) {
        try {
            // password = $3 userData.password
            const result = await Database.query(
                `UPDATE marca 
                 SET marca_imagen = $2,  updated_at = NOW() 
                 WHERE id = $1 
                 RETURNING *`,
                [id, archivo]
            );


            return result.rows[0] ? new User(result.rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }


    static async updateMarca(id, MarcaData) {
        try {
            const result = await Database.query(
                `UPDATE marca 
         SET marca_nombre = $1, marca_descripcion = $2, marca_estado = $3, updated_at = NOW() 
         WHERE id = $4 
         RETURNING *`,
                [MarcaData.marca_nombre, MarcaData.marca_descripcion, MarcaData.marca_estado, id]
            );

            return result.rows[0] ? new User(result.rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteMarca(id) {
        try {
            const result = await Database.query('DELETE FROM  marca  WHERE id = $1', [id]);
            return result.rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

}



module.exports = MarcaRepository; 