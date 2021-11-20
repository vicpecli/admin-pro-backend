const {response} = require('express')
const Medico = require('../models/medicos')

const getMedicos = async (req, res = response)=>{

    const medicosDB = await Medico.find()
                                  .populate('usuario', 'nombre img')
                                  .populate('hospital', 'nombre img');

    res.json({
        ok:true,
        medicosDB
    })
}

const crearMedico = async (req, res = response)=>{

    const uid = req.uid;
        
     const medico = new Medico({
         usuario:uid,
         ...req.body
     })

     console.log(medico)

    try{

        const medicoDB = await medico.save()
        
  
         res.json({
             ok:true,
             medico: medicoDB
         })
 

     }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
   }


   
}

const actualizarMedico = (req, res = response)=>{
    res.json({
        ok:true,
        msg:'actualizarMedicos'
    })
}

const borrarMedico= (req, res = response)=>{
    res.json({
        ok:true,
        msg:'borrarMedicos'
    })
}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
    
}