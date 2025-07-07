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

}

module.exports = MarcaRepository; 