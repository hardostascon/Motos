const Database = require('../database/connection');
const User = require('../models/marca');
class MarcaRepository {
     static async create(MarcaData) {
        try {
            const result = await Database.query(
                `INSERT INTO marca (marca_nombre, marca_descripcion, marca_imagen,marca_estado, created_at) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
                [MarcaData.narca_nombre, MarcaData.marca_descripcion, MarcaData.imagen, MarcaData.marca_estado, new Date()]
            );

            const user = result.rows[0];

            return selectFields(user, ['id', 'name', 'email', 'uperfil', 'created_at']);
        } catch (error) {
            throw error;
        }
    }

}