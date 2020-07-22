const { response } = require('express');
const Medico = require('../models/Medico');

const getMedicos = async (req, res) => {

    const medicos = await Medico.find()
                                .populate('hospital', 'nombre')
                                .populate('usuario', 'nombre');

    res.json({
        ok: true,
        medicos: medicos
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body});
        const { nombre } = medico;

    try {
        
        const existeMedico = await Medico.findOne({ nombre });

        if (existeMedico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico ya esta registrado'
            });
        }

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
        
  
}

const actualizarMedico = async (req, res = response) => {
 

        res.json({
            ok: true,
            // uid,
            // Medico: MedicoActualizado,
            msg: 'actualizarMedico ' + req.params.id
        });

 
};

const borrarMedico = async (req, res = response) => {

        
        res.json({
            ok: true,
            // Medico: MedicoBorrado,
            msg: 'borrarMedico'
        });

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}