// Busqueda
// /api/busqueda/:id

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos} = require('../midelwares/validar-campos');
const { validarJWT } = require('../midelwares/validar-jwt');

const router = Router();

const { getBusqueda, getDocumentosColeccion  } = require('../controllers/busqueda')
 
router.get( '/:busqueda',   [  validarJWT  ]  , getBusqueda );
router.get( '/coleccion/:tabla/:busqueda',   [  validarJWT  ]  , getDocumentosColeccion );



module.exports = router;