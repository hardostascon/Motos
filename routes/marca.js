const express = require("express");
const router = express.Router();

const MarcasController = require("../controllers/marcas");
const UserController = require("../controllers/user");
const { auth } = require("../middelwares/auth");

router.post("/save",auth, MarcasController.GuardarMarcas);
router.get("/list/:page", MarcasController.ListarMarcas);
router.put("/update", MarcasController.ActualizarMarca);
router.delete("/remove", MarcasController.BorrarMarca);
router.get("/search/:search", MarcasController.BuscarMarca);
router.put("/upload/:id", MarcasController.UploadImagenMarca);
router.get("/imagenMarca/:file", MarcasController.MostarImagenMarca);

module.exports = router;