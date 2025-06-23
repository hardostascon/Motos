const express = require("express");
const router = express.Router();

const MarcasController = require("../controllers/marcas");


router.post("/save",MarcasController.GuardarMarcas);
router.get("/list/:page",MarcasController.ListarMarcas);
router.put("/update",MarcasController.ActualizarMarca);
router.delete("/remove",MarcasController.BorrarMarca);
router.get("/search/:search",MarcasController.BuscarMarca);
router.put("/upload/:id",MarcasController.UploadImagenMarca);
router.get("/imagenMarca/:file",MarcasController.MostarImagenMarca);

module.exports=router;