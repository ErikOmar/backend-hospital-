const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('./../helpers/menu-frontend');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrecta. (E)'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrecta. (P)'
            });
        }

        // Generar token JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        let usuario;
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en base de datos
        await usuario.save();

        // Generar token JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

}

const renewToken = async (req, res =response ) => {

    const uid = req.uid;

    //Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    // Generar token JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        usuario,
        token,
        menu: getMenuFrontEnd(usuario.role)
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}