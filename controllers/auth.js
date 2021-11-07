
const{response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, resp = response)=>{

    const { email, password } = req.body
    console.log('Contrasena',password)
    console.log('Email',email)
    try{

        //Verifica email
        const usuarioDB = await Usuario.findOne({email})
        if(!usuarioDB){
            resp.status(404).json({
                ok: false,
                msg:'Email No valido'
            })
        }

       // Verifica contrtasena
       // Encriptar Contrasena
       
        const validPassword = bcrypt.compareSync( password , usuarioDB.password)
        if(!validPassword){
            resp.status(404).json({
                ok: false,
                msg:'Contrasenia No valido'
            })
        }

        //Todo Generar el Tocken
        const  token = await generarJWT(usuarioDB.id);
        resp.status(200).json({
            ok: true,
            token
        })


     
   
        


    }catch(error){
       
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg:'Hable con el Administrador'
        })
    }



}


module.exports = {
    login
}