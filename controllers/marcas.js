const GuardarMarcas = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para Guardar Marcas"
   })
}


const ListarMarcas = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para Listar Marcas"
   })
}


const ActualizarMarca = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para actualizar Marca"
   })
}


const BorrarMarca = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para borrar Marca"
   })
}


const BuscarMarca = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para registrar usuario"
   })
}

const UploadImagenMarca = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para registrar usuario"
   })
}


const MostarImagenMarca = (req,res) =>{
     return res.status(200).json({
       status:200,
       message:"Accion Para registrar usuario"
   })
}

module.exports={
     GuardarMarcas,
     ListarMarcas,
     ActualizarMarca,
     BorrarMarca,
     UploadImagenMarca,
     BuscarMarca,
     MostarImagenMarca
}