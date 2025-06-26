const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user");
const {auth} =require("../middelwares/auth");

router.post("/register",UserController.register);
router.post("/login",UserController.login);

router.get("/profile/:id",UserController.profile);
router.put("/update",UserController.update);
router.put("/upload/:id",UserController.upload);

router.get("/avatar/:file",UserController.Avatar);

module.exports = router;
