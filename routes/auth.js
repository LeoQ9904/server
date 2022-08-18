const {Router} = require('express');
const { check } = require('express-validator');
const { login, sinoutGoogle, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',validJWT,renovarToken);

router.post('/login',[
    check('correo','El correo no es válido').isEmail(),
    check('password','debe ingresar una contraseña').notEmpty(),
    validarCampos
],login);
router.post('/google',[
    check('id_token','El token no puedo estar vácio').notEmpty(),
    validarCampos
],sinoutGoogle)

 
module.exports = router;