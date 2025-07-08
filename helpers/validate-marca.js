const validator = require("validator"); 
const validate = (params) => {
    let validation = false;
     console.log(params);
    let name = !validator.isEmpty(params.marca_nombre || "") &&
        validator.isLength(params.marca_nombre || "", { min: 3, max: 50 }) &&
        validator.isAlpha(params.marca_nombre.replace(/\s/g, ""), "es-ES");

    let descripcion = !validator.isEmpty(params.marca_descripcion || "") &&
        validator.isLength(params.marca_descripcion || "", { min: 3, max: 150 });
   
    
    if (!name || !descripcion) {
        console.log(name, descripcion);
        throw new Error("No se ha superado la validacion");
    } else {
        console.log("validacion superada");
        validation = true;
    }

    return validation;
}

module.exports = validate;