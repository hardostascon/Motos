const { Client } = require('pg');

const connectionData = {
  user: 'postgres',
  host: '',
  database: 'dbmotos',
  password: '123456',
  port: 5432
}


const connection = new Client(connectionData);

connection.connect()
  .then(() => console.log("Te has conectado a la base de datos"))
  .catch((error) => {
    console.log(error);
    throw new Error("No se pudo conectar a la Base de datos");
  });

module.exports = connection;