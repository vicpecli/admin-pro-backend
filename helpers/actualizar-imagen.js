const fs = require('fs')
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const {response, request} = require('express')

const borrarImagen = (path) =>{
   
    if(fs.existsSync(path)){
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tabla, id, nombreArchivo) =>{
    console.log('actualizar imagen')
    let pathViejo= '';
    switch(tabla){
        case 'medicos':

                const medico = await Medico.findById(id);
                if(!medico){
                    return false;
                }

                pathViejo =`./uploads/medicos/${medico.img}`
                borrarImagen(pathViejo)
       
                medico.img = nombreArchivo;
                await medico.save();
                return true;
                
            break;
        case 'hospitales':
            
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

            pathViejo =`./uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo)
   
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':
            console.log('usuarios')
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }

            pathViejo =`./uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo)
   
            usuario.img = nombreArchivo;
            console.log(usuario)
            await usuario.save();
            return true;

            break;
    }



}

module.exports={
    actualizarImagen
}