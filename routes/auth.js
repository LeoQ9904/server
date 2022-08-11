const {Router} = require('express');
const { check } = require('express-validator');
const { login, sinoutGoogle } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


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