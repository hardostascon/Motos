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
     return res.status(200).json({
          status: 200,
          message: "Accion Para Guardar Marcas"
     })
}


const ListarMarcas = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para Listar Marcas"
     })
}


const ActualizarMarca = async (req, res) => {
     let body = req.body;

     try {

          validate(body);


          try {

               const existingMarca = await MarcaRepository.findByMarca(req.body.id);
               if (!existingMarca) {
                    fs.unlinkSync(filePath); // Eliminar el archivo si la marca no existe
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


const BorrarMarca = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para borrar Marca"
     })
}


const BuscarMarca = (req, res) => {
     return res.status(200).json({
          status: 200,
          message: "Accion Para registrar usuario"
     })
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