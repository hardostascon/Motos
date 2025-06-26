const jwt = require("jwt-simple");
const { secret } = require("../helpers/jwt");
exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {

        return res.status(404).json({
            status:"error",
            error :"La peticion no tiene autorizacion"
        });

    }

    let token = req.headers.authorization.replace(/['"]+/g, "");
    try {

        let payLoad = jwt.decode(token,secret);
         let now = Math.floor(Date.now()/1000);
        if(payLoad.exp<=now){
             return res.status(404).json({
            status: "error",
            error: "La autenticacion Ha expirado"
        });
        }

        req.user = payLoad;





    } catch (e) {
        return res.status(404).json({
            status: "error",
            error: "Token Invalido"
        });
    }

}