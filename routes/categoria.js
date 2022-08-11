const { Router } = require('express');
const {check} = require('express-validator');


const { getCategorias,getCategoria,postCategorias,putCategoria,deleteCategoria } = require('../controllers/categoria');
const { categoriaPorIdExiste } = require('../helpers/db-validacion');
const { validJWT, validarCampos, esAdminrol, tieneRol } = require('../middlewares');


//iniciacion de router
const router =  Router();


//direcciones o enpoins que se va a trabajar.

////Obtener todas las categorias - no restringir 
router.get('/',getCategorias)

////Obtener categoria por id - publico
router.get('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    check('id').custom( categoriaPorIdExiste ),
    validarCampos
],getCategoria)

////crear categoria - privado - cualquier token
router.post('/',[
    validJWT,
    check('nombre','Es obligatorio').notEmpty(),
    validarCampos
],postCategorias)

////Actualizar categoria por id - privado - cualquier rol
router.put('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    check('id').custom( categoriaPorIdExiste ),
    validJWT,
    check('nombre','Es obligatorio').notEmpty(),
    validarCampos
],putCategoria)

////eliminar categoria -privado - ADMIN_ROL
router.delete('/:id',[
    check('id','No es valido el id ingresado').isMongoId(),
    check('id').custom( categoriaPorIdExiste ),
    validJWT,
    tieneRol('ADMIN_ROL'),
    validarCampos
],deleteCategoria)





module.exports = router;