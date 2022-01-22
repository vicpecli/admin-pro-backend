
// Ruta : /api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const {getUsuarios, crearUsuario,  actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')

const { validarCampos} = require('../midelwares/validar-campos');
const { validarJWT, validarADMIN_ROLE_o_Mismo_USUARIO } = require('../midelwares/validar-jwt');

router.get( '/', validarJWT ,getUsuarios );

//el parametro de enmedio es un midelware, para usar esto hemos instalado => npm i express-validator
router.post('/', 
[
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    check('email', 'El Email es Obligatorio').isEmail(),
    validarCampos,
]
,crearUsuario);

router.put('/:id',
[   validarJWT,
    validarADMIN_ROLE_o_Mismo_USUARIO, //pero en este caso solo debe poder actualizar su propia informacion
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('email', 'El Email es Obligatorio').isEmail(),
    check('role', 'El rol es Obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuario );


router.delete('/:id',
[ 
    validarCampos,
], borrarUsuario);

module.exports = router