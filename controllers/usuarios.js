const { response, request} = require('express')
const bcrypt = require('bcryptjs') // npm i bcryptjs
const Usuario =require('../models/usuario')
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (request, response)=>{
    console.log('Llegoooo')
    const desde = Number(request.query.desde) || 0;



    console.log(desde)

    // const usuarios = await Usuario
    //                         .find({}, 'nombre email role google')//asi no pasas el password y pasas los que pones
    //                         .skip(desde) //se salta los registros de ataras. Si pasas un 5 monstraria desde ewl 5 en adelante
    //                         .limit(5)//Asi dices cuantos pasas

    // const total = await Usuario.count();

    //asi las dos promesas se ejecutan de manera simultanea

    const [usuarios, total ] = await Promise.all([
                    Usuario
                            .find({}, 'nombre email role google img')//asi no pasas el password y pasas los que pones
                            .skip(desde) //se salta los registros de ataras. Si pasas un 5 monstraria desde ewl 5 en adelante
                            .limit(5),      //Asi dices cuantos pasas
                    Usuario.countDocuments()
    ])
    
    response.status(200).json({
        ok: true,
        usuarios: [ {
            id:1233,
            usuarios,
            total
        }]
    });

}


const crearUsuario = async (request, response = response)=>{

    const {email, password} = request.body;


    try{
     
        const existeEmail = await Usuario.findOne({email});
         //   const existeEmail = Usuario.findOne({email:email}); al llamarse igual se puede poner asi

        if(existeEmail){
           
            return response.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(request.body)
        //Encriptar Contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        //Guardamos Usuarios
        await usuario.save();

        //Generar el JWT
        const  token = await generarJWT(usuario.id);

        response.status(200).json({
            ok: true,
            usuarios: usuario,
            token
        });

    }catch(error){
      console.log(error)
        response.status(500).json({
            ok:false,
            msg:'Error inesperado0...Revisar Logs'
        });
    }


}

const  actualizarUsuario  = async(request, response = response)=>{

 // Todo Validar Toquen y comprobar si el usuario es correcto
    const uid =request.params.id
    const {password, google, email, ...campos} = request.body;

    
    try {
        console.log('Existe el correo',email)
        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB){
    
            response.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese ID  '
            });
        }

    
        //Actualizaciones


        if(usuarioDB.email !==email){
    

            const existeEmail = await Usuario.findOne({email: request.body.email});
            if( existeEmail ){
                return response.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                })
            }

        }

        const campos = request.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true} );
        
        response.status(200).json({
            ok: true,
            usuarioActualizado
        });

    }catch(error){

        response.status(500).json({
            ok:false,
            msg:'Error inesperado...Revisar L0gs'
        });

    }

}


    const borrarUsuario = async(request, response = response)=>{
        const uid =request.params.id

        try{

            const usuarioDB = await Usuario.findById(uid)

            if(!usuarioDB){
        
                response.status(404).json({
                    ok:false,
                    msg:'No existe un usuario con ese ID  '
                });
            }

            await Usuario.findByIdAndDelete(uid);
            response.status(200).json({
                ok:true,          
                msg:'User Deleted',
                uid            
            });

        }catch(error){
            response.status(500).json({
                ok:false,          
                msg:'Error inesperado...Revisar Logs',
                       
            });
        }
       

    }



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}