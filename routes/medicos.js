// Medicos
// /api/medicos

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos} = require('../midelwares/validar-campos');
const { validarJWT } = require('../midelwares/validar-jwt');

const router = Router();

const {   getMedicos,  crearMedico,    actualizarMedico,    borrarMedico, getMedicoById}
 = require('../controllers/medicos')
 
router.get( '/',validarJWT, getMedicos );

router.get( '/:id', validarJWT, getMedicoById );

//el parametro de enmedio es un midelware, para usar esto hemos instalado => npm i express-validator
router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser Valido').isMongoId(),
    validarCampos
]  
,crearMedico );

router.put('/:id',
[
    validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser Valido').isMongoId(),
    validarCampos


],
 actualizarMedico);


router.delete('/:id',validarJWT, borrarMedico);

module.exports = router;