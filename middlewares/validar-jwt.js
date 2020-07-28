const { model } = require("mongoose")
const { response } = require('express');
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario")

const validarJWT = (req, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');

    if( !token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET); // Si no lo valida arroja una excepción

        req.uid = uid;
        next();

    } catch (error) {
         return res.status(401).json({
            ok: false,
            msg: 'No token correcto'
        })
    }
}

const validarADMIN_ROLE = async (req, res, next) =>{

    const uid = req.uid 
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }
        
        if( usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios'
            })
        }

        next();

    } catch (error) {
         return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) =>{

    const uid = req.uid 
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }
        

        // Si el usuario no es admin o no es el mismo usuario
        if( usuarioDB.role !== 'ADMIN_ROLE' && uid !== id){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios'
            })
        }

        next();

    } catch (error) {
         return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}