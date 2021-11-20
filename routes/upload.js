// Upload
// /api/upload

const { Router } = require('express');
const  expressFileUpload = require('express-fileupload');

const { check } = require('express-validator')
const { validarCampos} = require('../midelwares/validar-campos');
const { validarJWT } = require('../midelwares/validar-jwt');
const {   uploadDocument, downloadDocument } = require('../controllers/upload')


const router = Router();

router.use(expressFileUpload());
router.put('/:tabla/:documento', 
[
    validarJWT,
]  
,uploadDocument );

router.get('/:tabla/:documento', 
[
    validarJWT,
]  
,downloadDocument );


module.exports = router;