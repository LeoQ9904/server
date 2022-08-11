//libreria de terceros
const {Router} = require('express');
const { check } = require('express-validator');

//controlador
const { userGet, userPost, userDelete, userPut } = require('../controllers/user');

//helpers validaciones
const { esRoleValido, emailExiste, userPorIdExiste } = require('../helpers/db-validacion');

//middlewares
const { esAdminrol, tieneRol, validJWT, validarCampos } = require('../middlewares');


const router = Router();


router.get('/', userGet)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 6 digitos').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom( esRoleValido ),
    validarCampos
], userPost)
router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom( userPorIdExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], userPut)
router.delete('/:id',[
    validJWT,
    // esAdminrol, forza que sea si o si admin
    tieneRol('ADMIN_ROL','USER_ROL','VENTAS_ROL'), //forza la validación de diferentes tipos de rol
    check('id','No es un id válido').isMongoId(),
    check('id').custom( userPorIdExiste ),
    validarCampos
], userDelete)



module.exports = router;