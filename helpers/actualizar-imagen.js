const fs = require('fs');

const Usuario = require('../models/usuario')
const Medico = require('../models/Medico')
const Hospital = require('../models/Hospital')

const borrarImagen = (pathViejo) => {
    
    if (fs.existsSync(pathViejo)) {
        // Borrar imagen anterior
        fs.unlinkSync(pathViejo);
    }
}
const actulizarImagen = async (tipo, uid, nombreArchivo) => {

    let pathViejo;

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(uid);
            if (!usuario) {
                console.log('No se encontro usuario por id');
                return false
            }

            pathViejo = `./uploads/${tipo}/${usuario.img}`;
            borrarImagen(pathViejo);
            
            usuario.img = nombreArchivo;
            await usuario.save()
            break;
        case 'medicos':
            const medico = await Medico.findById(uid);
            if (!medico) {
                console.log('No se encontro medico por id');
                return false
            }

            pathViejo = `./uploads/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);
            
            medico.img = nombreArchivo;
            await medico.save()
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(uid);
            if (!hospital) {
                console.log('No se encontro hospital por id');
                return false
            }

            pathViejo = `./uploads/${tipo}/${hospital.img}`;
            borrarImagen(pathViejo);
            
            hospital.img = nombreArchivo;
            await hospital.save();
            break;
        default:

            break;
    }

    return true;
}

module.exports = actulizarImagen;