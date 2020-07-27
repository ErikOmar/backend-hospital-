/*
    Ruta: /api/uploads/:tipo/:uid
*/
const { Router } = require("express");
const fileUpload = require('express-fileupload');
const { validarJWT } = require("../middlewares/validar-jwt");

const { cargarArchivo, retornaImagen } = require("../controllers/uploads");

const router = Router();

router.use(fileUpload());

router.get('/:tipo/:foto', retornaImagen);
router.put('/:tipo/:uid', validarJWT, cargarArchivo);

module.exports = router;