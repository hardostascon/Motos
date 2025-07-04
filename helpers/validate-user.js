const validator = require("validator");

const validate = (params,withPassword=true) => {
    let validation = false;

    let name = !validator.isEmpty(params.name) &&
        validator.isLength(params.name, { min: 3, max: 50 }) &&
        validator.isAlpha(params.name, "es-ES");

    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);

    let password = true;
    if(withPassword){
    let password = !validator.isEmpty(params.password) &&
        validator.isLength(params.password, { min: 6, max: 150 }) 
        ;
    }


    if (!name || !email || !password) {
        throw new Error("No se ha superado la validacion");

    } else {
        console.log("validacion superada");
        validation = true;
    }

    return validate;
}



module.exports = validate;