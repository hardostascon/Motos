const validate = require("../helpers/validate-user");
const UserRepository = require('../repositories/user');
const user = require("../models/user");
const bcrypt = require('bcrypt');

const register = async (req, res) => {

     let body = req.body;

     try {

          validate(body);

     } catch (error) {

          return res.status(400).json({
               status: "error",
               message: "Validacion de usuario no superada"

          });

     }

     try {
          console.log(body.email);
          const existingUser = await UserRepository.findByEmail(body.email, 1);


     } catch (e) {
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "El usuario ya esta registrado"


          });
     }

     let password = await bcrypt.hash(body.password, 10);
     body.password = password;
     body.email = body.email.toLowerCase();

     try {
          let userToSave = await UserRepository.create(body);
     } catch (e) {
          console.log(e);
     }


     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario",
          data: body
     })
}


const login = async (req, res) => {

     let body = req.body;
     if (!body.email || !body.password) {
          return res.status(400).json({
               status: "error",
               message: "Falta Datos por enviar"
          });

     }


     try {
          console.log(body.email);
          const User = await UserRepository.findByEmail(body.email, 2);

          let pwd = bcrypt.compareSync(body.password, User.password);

          if (!pwd) {
               return res.status(400).json({
                    status: "error",
                    message: "Contraseña no valida"
               });
          }


     } catch (e) {
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "El usuario al buscar el usuario"


          });
     }
     return res.status(200).json({
          status: 200,
          message: "Accion Para Identificar usuario"
     })
}


const profile = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario"
     })
}


const update = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario"
     })
}


const upload = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario"
     })
}


const Avatar = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario"
     })
}


module.exports = {
     register,
     login,
     profile,
     update,
     upload,
     Avatar


}