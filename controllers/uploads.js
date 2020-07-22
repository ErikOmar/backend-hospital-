const { response } = require("express");
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const actulizarImagen = require("../helpers/actualizar-imagen");


const cargarArchivo = (req, res = response) => {

    const { tipo, uid } = req.params;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    try {

        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo no valido .::. ' + tiposValidos.toString()
            });
        }

        // Validar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo seleccionado'
            });
        }

        //Procesar la imagen
        const file = req.files.imagen;

        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        // Validar extención
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
        if (!extensionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'Extenciones validas .::. ' + tiposValidos.toString()
            });
        }

        // Generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

        // Path para guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`;

        // Mover la imagen
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al cargar la imagen'
                });
            }
        });

        //Actualizar base de datos
        actulizarImagen(tipo, uid, nombreArchivo);

        res.json({
            ok: true,
            nombreArchivo,
            msg: 'Archivo cargado'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Consulte con el adminsitrador'
        });
    }

}

const retornaImagen = (req, res = response) => {
    const { tipo, foto } = req.params;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    cargarArchivo,
    retornaImagen
}