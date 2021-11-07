// Ruta : /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');
const { validarCampos } = require('../midelwares/validar-campos');

const router = Router()

router.post('/',
[

    check('email', 'el email es Obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
login
)





module.exports = router;