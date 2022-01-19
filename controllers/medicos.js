const {response} = require('express')
const Medico = require('../models/medicos')

const getMedicos = async (req, res = response)=>{

    const medicos = await Medico.find()
                                  .populate('usuario', 'nombre img')
                                  .populate('hospital', 'nombre img');

    res.json({
        ok:true,
        medicos
    })
}

const getMedicoById = async (req, res = response)=>{
    
    const id=req.params.id

    try {
        const medico = await Medico.findById(id)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

            res.json({
            ok:true,
            medico
            })
        
    } catch (error) {

        console.log(error)

        res.json({
            ok:true,
            msg:'Hable con el Administrador'
        })
        
    }

 
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

const actualizarMedico = async (req, res = response)=>{

    const id = req.params.id
   
    const uid = req.uid // es el usuario que va a actualizar esto

    //vemos si existe ese Medico

    try{

        const existeMedico = await Medico.findById(id)

        if(!existeMedico){
            res.status(400).json({
                ok:false,
                msg:'No se encuentra el Medico'
            })
        }
    
        cambiosMedico ={
            ...req.body,
            usuario: uid
        }
    
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico, {new:true} )
    
    
        res.status(200).json({
            ok:true,
            medico:medicoActualizado
        })
    }catch(error){

        res.status(404).json({
            ok:true,
            msg:'Contacte con el Administrador'
        })
    }

}

const borrarMedico= async (req, res = response)=>{

    const id = req.params.id;

    try{
            
        const existeMedico = await Medico.findById(id)
        if(!existeMedico){
            res.status(400).json({
                ok:false,
                msg:'No se encuentra el Medico'
            })
        }
        await Medico.findByIdAndDelete(id)

        res.status(200).json({
            ok:true,
            msg:'borrarMedicos'
        })

    }catch(error){
        console.log('Entro en el error',error)
        res.status(404).json({
            ok:true,
            msg:'Contacte con el Administrador'
        })
    }

}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
    
}