const path = require('path')
const fs = require('fs')

const {response, request} = require('express')
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const {v4: uuidv4} = require('uuid')
const {actualizarImagen} = require('../helpers/actualizar-imagen')

const uploadDocument= async(request, res = response)=>{
    console.log('Upload Document')

    const tabla =request.params.tabla
    const documento =request.params.documento

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
   
    if(!tiposValidos.includes(tabla)){
        return res.status(400).json({
            ok:false,
            msg:'La tabla tiene que ser Usuarios/Medicos/Hospitales'
        })
    }

    //Validar que exista UN DOCUMENTO
    if(!request.files || Object.keys(request.files).length===0){
        return res.status(400).json({
            ok:false,
            msg:'No files where Uploaded.'})
    }

    //procesar la imagen

    const file = request.files.imagen;
    const nombreCortado = file.name.split('.');//Picture.1.2.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length-1]

    //validar extension
    const extensionesValidas = ['png', 'JPG', 'jpg', 'jpeg', 'gif']
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension Permitida'})
    }

    //Generar el Nombre del Archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    //path para guardar la imagen
    const path = `./uploads/${tabla}/${nombreArchivo}`

    //Mover la imagen
    file.mv(path, (err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'})
        }

        //Actualizamos la BD
        actualizarImagen(tabla, documento, nombreArchivo);

        res.status(200).json({
            ok:true,
            msg: 'Archivo Subido',
            nombreArchivo
        })
    })
}

const downloadDocument= async(request, res = response)=>{
    console.log('Download Document')
    const tabla =request.params.tabla
    const documento =request.params.documento
    console.log(tabla)

    // const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    console.log(documento)
    var pathImg = path.join(__dirname, `../uploads/${tabla}/${documento}`)
   
    //Imagen Por defecto
    if( fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    } else {
        pathImg = path.join(__dirname, `../uploads/Defecto.JPG`)
        res.sendFile(pathImg)

    }
   


  
   
  

 
}




module.exports = {
    uploadDocument,
    downloadDocument
    
}