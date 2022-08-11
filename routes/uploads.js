const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleeccionesPermitidas } = require('../helpers/db-validacion');
const { validarCampos, validarArchivosubir } = require('../middlewares');

const router = Router();

router.post('/',[
    validarArchivosubir,validarCampos
],cargarArchivo);
router.put('/:coleccion/:id',[
    check('id','id no valido').isMongoId(),
    check('coleccion').custom( c=>coleeccionesPermitidas( c, ['user','producto'] ) ),
    validarArchivosubir,
    validarCampos
],actualizarImagenCloudinary)
router.get('/:coleccion/:id',[
    check('id','id no valido').isMongoId(),
    check('coleccion').custom( c=>coleeccionesPermitidas( c, ['user','producto'] ) ),    
    validarCampos
],mostrarImagen)

module.exports = router;