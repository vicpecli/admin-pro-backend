
const{response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify}  =  require('../helpers/google-verify');
const usuario = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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

        // Generar el Token
        const  token = await generarJWT(usuarioDB.id);
        resp.status(200).json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })
    }catch(error){
       
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg:'Hable con el Administrador'
        })
    }



}


const googleSignIn = async (req, res = response)=>{

    const googleToken = req.body.token;

    try{
      const {name, email, picture}=  await googleVerify(googleToken) ;

      // Revisar que no exista este usuario
      const usuarioDB = await Usuario.findOne({email})
      let usuario;

      if(!usuarioDB){
          usuario = new Usuario({
               nombre: name,
               email,
               //al intentar hacer el login con esa contrasena cuando haga eso hara el hash de una sola via y ya no sera la misma 
               password:'@@@',
               img: picture,
               google: true
          });
      }else {
        //existe usuario
        usuario = usuarioDB;
        usuario.google = true;
      }

        //guardar en BD
        await usuario.save()
        // Generar el Token
        const  token = await generarJWT(usuario.id);

        res.status(200).json({
            ok:true,
            msg: "Google sign in",
            token,
            menu: getMenuFrontEnd(usuario.role)
        })

    }catch(error){
    
        resp.status(401).json({
            ok: false,
            msg:'Token no es correcto'
        })
    }

}




const renewToken = async (req, res = response)=>{

    const uid = req.uid;
    const usuarioDB= await Usuario.findById(uid)
    

    const token = await generarJWT(uid)

        res.status(200).json({
            ok:true,
            msg: "Renew Token",
            token,
            usuarioDB,
            menu: getMenuFrontEnd(usuario.role)
        })




}


module.exports = {
    login,
    googleSignIn,
    renewToken
}