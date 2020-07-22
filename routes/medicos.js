/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/Medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', 
    validarJWT, 
    getMedicos);

router.post(
    '/',
    [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
    ],
    crearMedico
);

router.put(
    '/:id',
    [
        //validarJWT,

    ],
    actualizarMedico
);

router.delete(
    '/:id',
    //validarJWT,
    borrarMedico
);

module.exports = router;