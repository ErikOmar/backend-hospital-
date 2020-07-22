const {response} = require("express");

const Usuario = require('../models/usuario');
const Medico = require("../models/Medico");
const Hospital = require("../models/Hospital");

const getTodo = async (req, res = response) => {

  const busqueda = req.params.busqueda;
  const buquedaCaseInsencitive = new RegExp(busqueda, 'i');

  try {

    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({nombre: buquedaCaseInsencitive}),
      Medico.find({nombre: buquedaCaseInsencitive}),
      Hospital.find({nombre: buquedaCaseInsencitive}),
    ]);

    res.json({
      ok: true,
      usuarios,
      medicos,
      hospitales
    })

  } catch (error) {
    console.log(error);

    res.status(400).json({
      ok: false,
      msg: 'Contacte al administrador'
    });

  }

}

const getDocumentosColeccion = async (req, res = response) => {

  const busqueda = req.params.busqueda;
  const tabla = req.params.tabla;
  const buquedaCaseInsencitive = new RegExp(busqueda, 'i');

  try {

    let data

    switch (tabla) {
      case 'Usuarios':
        data = await Usuario.find({nombre: buquedaCaseInsencitive})
        break;
      case 'Medicos':
        data = await Medico.find({nombre: buquedaCaseInsencitive})
          .populate('usuario', 'nombre img')
          .populate('hospital', 'nombre img')
        break;
      case 'Hospitales':
        data = await Hospital.find({nombre: buquedaCaseInsencitive})
          .populate('usuario', 'nombre img')
        break;
      default:
        return res.status(400).json({
          ok: false,
          msj: 'La tabla tiene que ser Usuarios, Medicos, Hospitales'
        });
    }

    res.json({
      ok: true,
      resultados: data,
    })

  } catch (error) {
    console.log(error);

    res.status(400).json({
      ok: false,
      msg: 'Contacte al administrador'
    });

  }

}

module.exports = {
  getTodo,
  getDocumentosColeccion
}
