const  validarCampos = require('../middlewares/validar-campos');
const validJWT  = require('../middlewares/validar-jwt');
const  validarArchivosubir  = require('../middlewares/validar-archivo');
const  validaRoles  = require('../middlewares/validar-roles');

module.exports={
    ...validJWT,
    ...validaRoles,
    ...validarCampos,
    ...validarArchivosubir
}