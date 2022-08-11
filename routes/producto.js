const { Router } = require('express');
const {check} = require('express-validator');
const { getProductos, postProducto, getProducto, putProducto, deleteProducto } = require('../controllers/producto');
const { productoPorIdExiste } = require('../helpers/db-validacion');
const { validJWT, validarCampos, esAdminrol, tieneRol } = require('../middlewares');


//iniciacion de router
const router =  Router();


//direcciones o enpoins que se va a trabajar.
router.get('/',getProductos);

router.get('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    check('id').custom( productoPorIdExiste ),
    validarCampos
],getProducto)

router.post('/',[
    validJWT,
    check('nombre','Es obligatorio').notEmpty(),
    check('categoria','Es obligatorio').notEmpty(),
    check('categoria','No es una categoria valida').isMongoId(),    
    validarCampos
],postProducto)

router.put('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    validarCampos,
    check('id').custom( productoPorIdExiste ),
    validJWT,
    tieneRol('ADMIN_ROL'),    
    validarCampos    
],putProducto)

router.delete('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    validarCampos,
    check('id').custom( productoPorIdExiste ),
    validJWT,
    tieneRol('ADMIN_ROL'),    
    validarCampos    
],deleteProducto)

module.exports = router;