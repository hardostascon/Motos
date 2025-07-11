const Database = require('../database/connection');
const selectFields = require("../helpers/selectFields");

class GenericSql {

    static async create(tableName, data, selectFields = null) {
        try {
            const columns = Object.keys(data);
            const values = Object.values(data);

            columns.push('created_at');
            values.push(new Date());
            const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

            const query = `
                INSERT INTO ${tableName} (${columns.join(', ')}) 
                VALUES (${placeholders}) 
                RETURNING *
            `;

            const result = await Database.query(query, values);
            const record = result.rows[0];
            if (selectFields && Array.isArray(selectFields)) {
                return this.selectFields(record, selectFields);
            }

            return record;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async findByGeneric(codigo, tabla) {
        try {
            const result = await Database.query('SELECT * FROM ${tabla} WHERE id = $1', [codigo]);
            console.log(result.rows[0]);

            return result.rows[0] ? new User(result.rows[0]) : null;


        } catch (error) {
            throw error;
        }
    }

    static async update(id, tableName, data, selectFields = null) {
        try {

            const columns = Object.keys(data);
            const values = Object.values(data);

            columns.push('created_at');
            values.push(new Date());

            const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
            values.push(id);
            const idParamIndex = values.length;

            const returningFields = selectFields ? selectFields.join(', ') : '*';

            const query = `
            UPDATE ${tableName}
            SET ${setClause}
            WHERE id = $${idParamIndex}
            RETURNING ${returningFields};
        `;

            const record = result.rows[0];
            if (selectFields && Array.isArray(selectFields)) {
                return this.selectFields(record, selectFields);
            }

            return record;
        } catch (error) {
            throw error;
        }
    }


    static async delete(tabla, id) {
        try {
            const result = await Database.query('DELETE FROM  ${tabla}  WHERE id = $1', [id]);
            return result.rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findWithMarcaPagination(page = 1, limit = 10, tabla) {
        try {

            const allowedTables = ['marca', 'usuarios']; 

            if (!allowedTables.includes(tabla)) {
                throw new Error('Tabla no permitida');
            }
            const offset = (page - 1) * limit;

            // Consulta principal con LIMIT y OFFSET
            const dataQuery = `
            SELECT * 
            FROM ${tabla}
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;

            // Consulta para contar el total de registros
            const countQuery = 'SELECT COUNT(*) as total FROM  ${tabla}';

            // Ejecutar ambas consultas
            const [dataResult, countResult] = await Promise.all([
                Database.query(dataQuery, [limit, offset]),
                Database.query(countQuery)
            ]);

            const marcas = dataResult.rows.map(row => new User(row));
            const total = parseInt(countResult.rows[0].total);
            const totalPages = Math.ceil(total / limit);

            return {
                data: marcas,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalRecords: total,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } catch (error) {
            throw error;
        }
    }


     static async findWithPaginationWord(page = 1, limit = 10, tabla,word,campos = []) {
        try {

            const allowedTables = ['marca', 'usuarios']; 

            if (!allowedTables.includes(tabla)) {
                throw new Error('Tabla no permitida');
            } 

            const validFields = allowedTables[tabla];
            const selectedFields = campos.filter(field => validFields.includes(field));

            if (selectedFields.length === 0) {
                throw new Error('Ningún campo válido proporcionado');
            }

            const tsvectorExpr = selectedFields.join(` || ' ' || `);  


            const offset = (page - 1) * limit;

            // Consulta principal con LIMIT y OFFSET
            const dataQuery = `
            SELECT * 
            FROM ${tabla}
            WHERE to_tsvector('spanish', ${tsvectorExpr}) @@ plainto_tsquery('spanish', ${word})
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;

            // Consulta para contar el total de registros
            const countQuery = `SELECT COUNT(*) as total FROM ${tabla} WHERE to_tsvector('spanish', ${tsvectorExpr}) @@ plainto_tsquery('spanish', ${word})`;

            // Ejecutar ambas consultas
            const [dataResult, countResult] = await Promise.all([
                Database.query(dataQuery, [limit, offset]),
                Database.query(countQuery)
            ]);

            const marcas = dataResult.rows.map(row => new User(row));
            const total = parseInt(countResult.rows[0].total);
            const totalPages = Math.ceil(total / limit);

            return {
                data: marcas,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalRecords: total,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } catch (error) {
            throw error;
        }
    }

}