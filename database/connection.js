const { Client } = require('pg');

const connectionData = {
  user: 'postgres',
  host: '',
  database: 'dbmotos',
  password: '123456',
  port: 5432
}

 const connection = async() => {
    try{
         new Client(connectionData);
         console.log("Te has conectado a la base de datos");
    } catch(error){
        console.log(error);
        throw new Error("No se pudo conectar a la Base de datos");

    }
 }

//const client = new Client(connectionData);

module.exports=connection;