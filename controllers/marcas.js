const path = require("path");
const fs = require("fs");
const MarcaRepository = require('../repositories/marcas');
const validate = require("../helpers/validate-marca");
const GuardarMarcas = async (req, res) => {
     let body = req.body;
     try {

          validate(body);

          try {
               let MarcaToSave = await MarcaRepository.create(body);
               if (!MarcaToSave) {
                    return res.status(500).json({
                         status: "error",
                         message: "Error al guardar la marca"
                    });
               } else {
                    return res.status(200).json({
                         status: 200,
                         MarcaToSave,
                         message: "Marca guardada correctamente"
                    })
               }
          } catch (e) {
               console.log(e);
          }

     } catch (error) {
          console.log(error);
          return res.status(500).json({
               status: 500,
               message: "Error al guardar la marca"
          })
     }
    
}


const ListarMarcas = async (req, res) => {
     let page = req.params.page ? parseInt(req.params.page) : 1;
     let limit = req.params.limit ? parseInt(req.params.limit) : 10;
     try {

          const marcas = await MarcaRepository.findWithMarcaPagination(page, limit);
          if (!marcas) {
               return res.status(404).json({
                    status: "error",
                    message: "No se encontraron marcas"
               });
          } else {
               return res.status(200).json({
                    status: 200,
                    marcas,
                    message: "Marcas listadas correctamente"
               })
          }

     } catch(error){
          console.log(error);
          return res.status(500).json({
               status: 500,
               message: "Error al listar las marcas"
          })
     }
    
}


const ActualizarMarca = async (req, res) => {
     let body = req.body;

     try {

          validate(body);


          try {

               const existingMarca = await MarcaRepository.findByMarca(req.body.id);
               if (!existingMarca) {

                    return res.status(404).json({
                         status: "error",
                         message: "Marca no encontrada"
                    });
               }
               const updatedMarca = await MarcaRepository.updateMarca(req.body.id, body);
               if (!updatedMarca) {

                    return res.status(500).json({
                         status: "error",
                         message: "Error al actualizar la marca"
                    });
               } else {
                    return res.status(200).json({
                         status: 200,
                         updatedMarca,
                         message: "datos actualizados correctamente"
                    })
               }

          } catch (error) {

               return res.status(500).json({
                    status: 500,
                    message: "Error al actualizar la marca"
               })
          }

     } catch (error) {
          console.log(error);
          return res.status(500).json({
               status: 500,
               message: "Error al actualizar la marca"
          })
     }

}


const BorrarMarca = async (req, res) => {
     const id = req.params.id;
     console.log(id);
     try {
          const existingMarca = await MarcaRepository.findByMarca(req.params.id);
          if (!existingMarca) {

               return res.status(404).json({
                    status: "error",
                    message: "Marca no encontrada"
               });
          }

          const deletedMarca = await MarcaRepository.deleteMarca(id);
          if (!deletedMarca) {
               return res.status(500).json({
                    status: "error",
                    message: "Error al borrar la marca"
               });
          } else {
               return res.status(200).json({
                    status: 200,
                    message: "Marca borrarda correctamente"
               })
          }

     }
     catch (error) {
          console.log(error);
          return res.status(500).json({
               status: 500,
               message: "Error al borrar la marca"
          })
     }


}


const BuscarMarca = async (req, res) => {
      let page = req.params.page ? parseInt(req.params.page) : 1;
      let limit = req.params.limit ? parseInt(req.params.limit) : 10;
      let word = req.params.search ? req.params.search : '-1';
     try{
           const marcas = await MarcaRepository.findWithMarcaPaginationWord(page, limit,word);
          if (!marcas) {
               return res.status(404).json({
                    status: "error",
                    message: "No se encontraron marcas"
               });
          } else {
               return res.status(200).json({
                    status: 200,
                    marcas,
                    message: "Marcas listadas correctamente"
               })
          }

     }catch(e){
           console.log(e);
           return res.status(500).json({
               status: 500,
               message: "Error al generar La consulta"
          })
     }

     
}

const UploadImagenMarca = async (req, res) => {
     const id = req.body.marca;
     console.log(id);
     if (!req.file) {
          return res.status(400).json({
               status: "error",
               message: "La peticion no tiene la imagen"
          })
     }
     try {
          const { originalname, filename, path: filePath } = req.file;
          const ext = path.extname(originalname).toLocaleLowerCase();
          const validExtensions = [".png", ".jpg", ".jpeg", ".gif"];
          if (!validExtensions.includes(ext)) {
               fs.unlinkSync(filePath); // Eliminar el archivo si la extensión no es válida
               return res.status(400).json({
                    status: "error",
                    message: "La extension de la imagen no es valida"
               });
          }

          const existingMarca = await MarcaRepository.findByMarca(id);
          if (!existingMarca) {
               fs.unlinkSync(filePath); // Eliminar el archivo si la marca no existe
               return res.status(404).json({
                    status: "error",
                    message: "Marca no encontrada"
               });
          }

          const updatedMarca = await MarcaRepository.updateFileMarca(id, filename);
          if (!updatedMarca) {
               fs.unlinkSync(filePath); // Eliminar el archivo si la actualización falla
               return res.status(500).json({
                    status: "error",
                    message: "Error al actualizar la marca"
               });
          }
          return res.status(200).json({
               status: 200,
               updatedMarca,
               message: "Imagen subida correctamente"
          })

     } catch (error) {
          console.log(error);
          return res.status(500).json({
               status: "error",
               message: "Error al subir la imagen"
          })
     }

}


const MostarImagenMarca = (req, res) => {
     let file = req.params.file;
     let filePath = "./uploads/marcas/" + file;

     fs.stat(filePath, (error, exist) => {
          if (!error && exist) {

               return res.sendFile(path.resolve(filePath));
          } else {
               console.log(error);
               console.log(exist);
               return res.status(404).json({
                    status: 404,
                    message: "La imagen no existe"
               });
          }
     });

}

module.exports = {
     GuardarMarcas,
     ListarMarcas,
     ActualizarMarca,
     BorrarMarca,
     UploadImagenMarca,
     BuscarMarca,
     MostarImagenMarca
}