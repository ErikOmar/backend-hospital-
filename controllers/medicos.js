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

    const usuarioId = req.uid;

    const medico = new Medico({
        usuario: usuarioId,
        ...req.body
    });
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

    const medicoId = req.params.id;
    const usuarioId = req.uid;

    try {

        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con el id: ' + medicoId
            });
        }

        // Actualizaciones
        const cambiosMedico = { ...req.body, usuario: usuarioId };

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            uid: medicoId,
            medico: medicoActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperador... Revisar logs'
        });
    }

};

const borrarMedico = async (req, res = response) => {

    const medicoId = req.params.id;

    try {
        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe medico con el id'
            })
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            medico: medicoDB,
            msg: 'Medico borrado'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Consulte al adminsitrador'
        })
    }


}
const getMedicosById = async (req, res) => {

    const mid = req.params.id;
    try {
        const medico = await Medico.findById(mid)
            .populate('hospital', 'nombre')
            .populate('usuario', 'nombre');

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Consulte al adminsitrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicosById
}