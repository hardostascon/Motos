const Database = require('../database/connection');
const selectFields = require("../helpers/selectFields");

class GenericSql {

    static async create(tableName, data, selectFields = null) {
         try {

         }catch(e){
            console.log(e);
            throw e;
         }
    }

}