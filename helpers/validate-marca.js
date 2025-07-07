const validator = require("validator"); 
const validate = (params,withImage=true) => {
    let validation = false;

    let name = !validator.isEmpty(params.marca_nombre) &&
        validator.isLength(params.marca_nombre, { min: 3, max: 50 }) &&
        validator.isAlpha(params.marca_nombre, "es-ES");

    let descripcion = !validator.isEmpty(params.marca_descripcion) &&
        validator.isLength(params.marca_descripcion, { min: 3, max: 150 });
    let imagen = true;
    if(withImage){
         let imagen = !validator.isEmpty(params.imagen);
    }    
    

    if (!name || !descripcion || !imagen) {
        throw new Error("No se ha superado la validacion");
    } else {
        console.log("validacion superada");
        validation = true;
    }

    return validation;
}