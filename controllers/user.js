const validate = require("../helpers/validate-user");

const register = (req, res) => {

     let body = req.body;

     try {

          validate(body);

     } catch (error) {

          return res.status(400).json({
          status: "error",
          message: "Validacion de usuario no superada"
          
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