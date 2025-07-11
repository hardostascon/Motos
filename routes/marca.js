const express = require("express");
const router = express.Router();

const MarcasController = require("../controllers/marcas");
const UserController = require("../controllers/user");
const { auth } = require("../middelwares/auth");
const multer = require("multer");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/marcas")
    },
    filename:(req,file,cb)=>{
        cb(null,"marca-"+Date.now()+"-"+file.originalname);
    }
});

const uploadMarcas= multer({storage});

router.post("/save",[auth], MarcasController.GuardarMarcas);
router.get("/list/:page/:limit", MarcasController.ListarMarcas);
router.put("/update", [auth],MarcasController.ActualizarMarca);
router.delete("/remove/:id",[auth], MarcasController.BorrarMarca);
router.get("/search/:page/:limit/:search", MarcasController.BuscarMarca);
router.put("/upload/", [auth,uploadMarcas.single("file0")],MarcasController.UploadImagenMarca);
router.get("/imagenMarca/:file", MarcasController.MostarImagenMarca);

module.exports = router;