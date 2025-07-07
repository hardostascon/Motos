const validate = require("../helpers/validate-user");
const send_email = require("../helpers/send_email");
const UserRepository = require('../repositories/user');
const user = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("../helpers/jwt");


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
          let token = jwt.createToken(User);

          return res.status(200).json({
               status: 200,
               message: "Accion Para Identificar usuario",
               user: {
                    _id: User._id,
                    name: User.name,
                    email: User.email
               },
               token
          });


     } catch (e) {
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "El usuario al buscar el usuario"


          });
     }

}


const profile = async (req, res) => {

     let id = req.params.id;
     try {

          const user = await UserRepository.findById(id);
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
               });
          }

          return res.status(200).json({
               status: "success",
               user: user
          })

     } catch (e) {
          return res.status(404).json({
               success: false,
               message: 'Error al buscar el usuario!!'
          });
     }

}


const update = async (req, res) => {
     try {
          const UserIdentiy = req.user;
          // console.log(req.user);
          let userToUpdate = {
               name: req.body.name.toLowerCase() ?? UserIdentiy.name,
               email: req.body.email.toLowerCase() ?? UserIdentiy.email


          }
          validate(userToUpdate, false);
          const user = await UserRepository.findByEmail(userToUpdate.email, 2);

          console.log(UserIdentiy);
          console.log("ttt" + UserIdentiy.id + "tttt");
          if (user && user._id != UserIdentiy.id) {
               return res.status(400).json({
                    status: "error",
                    message: "El email ya esta en uso por otro usuario"
               });
          }

          const userUpdated = await UserRepository.update(user._id, userToUpdate);

          return res.status(200).json({
               status: 200,
               message: "Accion Para actualizar usuario",
               UserIdentiy,
               userToUpdate
          })

     } catch (e) {
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "Error al actualizar el usuario"
          });
     }


}

const changePassword = async (req, res) => {
     try {
          const UserIdentiy = req.user;

          let userToUpdatePsw = {
               password: req.body.password ?? UserIdentiy.password,
               email: req.body.email.toLowerCase() ?? UserIdentiy.email
          }
          validate(userToUpdatePsw, false, false);
          const user = await UserRepository.findByEmail(userToUpdatePsw.email, 2);

          let pwd = bcrypt.compareSync(req.body.password,  user.password);

          if (!pwd) {
               let password = await bcrypt.hash(userToUpdatePsw.password, 10);
               userToUpdatePsw.password = password;
               
          }

          if (user && user._id != UserIdentiy.id) {
               return res.status(400).json({
                    status: "error",
                    message: "El email ya esta en uso por otro usuario"
               });
          }

             
             const userChangePswd = await UserRepository.updatepswd(user._id, userToUpdatePsw);


          return res.status(200).json({
               status: 200,
               message: "Accion Para actualizar contraseña",
               UserIdentiy,
               userToUpdatePsw
          });




     } catch (e) {
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "Error al cambiar la contraseña"
          });
     }
}

const EnviarRecuperador = async (req, res) => {
      try{  
          const UserIdentiy = req.user; 
          let userToEmail = {
               email: req.body.email.toLowerCase() ?? UserIdentiy.email
          };
           validate(userToEmail, false, false);
           const user = await UserRepository.findByEmail(userToEmail.email, 2);
           if (!user) {
               return res.status(404).json({
                    status: "error",
                    message: "El usuario no existe"
               });
           }
           send_email(userToEmail.email);
           return res.status(200).json({
               status: 200,
               message: "Accion Para enviar email de recuperacion",
               data: "Email enviado correctamente"});

      }catch(e){
          console.log(e);
          return res.status(400).json({
               status: "error",
               message: "Error al enviar el email de recuperacion"
          });
}
}





module.exports = {
     register,
     login,
     profile,
     update,
     changePassword,
     EnviarRecuperador




}