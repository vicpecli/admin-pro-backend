// Hospitales
// /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos} = require('../midelwares/validar-campos');
const { validarJWT } = require('../midelwares/validar-jwt');

const router = Router();

const {   getHospitales,  crearHospital,    actualizarHospital,    borrarHospital}
 = require('../controllers/hospitales')
 
router.get( '/', getHospitales );

//el parametro de enmedio es un midelware, para usar esto hemos instalado => npm i express-validator
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],  
 crearHospital);

router.put('/:id', 
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
]
,actualizarHospital)

router.put('/:id', 
[
    validarJWT,
]
,borrarHospital)


router.delete('/:id', validarJWT,borrarHospital);

module.exports = router;