const {request, response} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next)=>{
    // leer el token
    const token = req.header('x-token')
  

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try{
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //sI EL VERIFY DA ERROR IRA AL CATCH
        //Asi pasarias el uid osea machacarias el uid con el uid que te han pasado 
        req.uid = uid;
        next()



    }catch(error){

        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });

    }




}

module.exports = {
    validarJWT
}