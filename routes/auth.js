// Ruta : /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSignIn, renewToken} = require('../controllers/auth');
const { validarCampos } = require('../midelwares/validar-campos');
const {validarJWT} = require('../midelwares/validar-jwt')

const router= Router()

router.post('/',
[

    check('email', 'el email es Obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login)

router.post('/google',
[
    check('token', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn)

router.get('/renew',validarJWT, renewToken)








module.exports = router;