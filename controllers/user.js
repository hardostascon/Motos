const validate = require("../helpers/validate-user");
const UserRepository = require('../repositories/user');
const user = require("../models/user");

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
          const existingUser = await UserRepository.findByEmail(body.email);
         

     } catch (e) {
              console.log(e);
              return res.status(400).json({
               status: "error",
               message: "El usuario ya esta registrado"
              

          });
     }


     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario",
          data: body
     })
}


const login = (req, res) => {
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