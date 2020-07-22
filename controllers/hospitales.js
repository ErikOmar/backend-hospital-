const { response } = require('express');
const Hospital = require('../models/Hospital');

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body});
        const { nombre } = hospital;

    try {
        
        const existeHospital = await Hospital.findOne({ nombre });

        if (existeHospital) {
            return res.status(400).json({
                ok: false,
                msg: 'El hospital ya esta registrado'
            });
        }

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

        
  
}

const actualizarHospital = async (req, res = response) => {
 

        res.json({
            ok: true,
            // uid,
            // Hospital: HospitalActualizado,
            msg: 'actualizarHospital ' + req.params.id
        });

 
};

const borrarHospital = async (req, res = response) => {

        
        res.json({
            ok: true,
            // Hospital: HospitalBorrado,
            msg: 'borrarHospital'
        });

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}