const {response, request} = require('express')
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')

const getBusqueda = async(request, res = response)=>{

    const busqueda =request.params.busqueda
    const regularExpresion = new RegExp(busqueda, 'i');

   

    const [usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({nombre : regularExpresion}),
        Hospital.find({nombre : regularExpresion}),
        Medico.find({nombre : regularExpresion})       
    ]);

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion= async(request, res = response)=>{

    const tabla =request.params.tabla
    const busqueda =request.params.busqueda
    const regularExpresion = new RegExp(busqueda, 'i');

    let data =[];

    switch(tabla){
        case 'medicos':
            data = await Medico.find({nombre : regularExpresion})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img')
        break;
        case 'hospitales':
            data = await Medico.find({nombre : regularExpresion})
                                .populate('usuario', 'nombre img')
        break;
        case 'usuarios':
            data = await Medico.find({nombre : regularExpresion})     
        break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser Usuarios/Medicos/Hospitales'
            })
           
    }
    res.json({
        ok:true,
        resultados:data
       
    })

 


}


module.exports = {
    getBusqueda,
    getDocumentosColeccion
    
}