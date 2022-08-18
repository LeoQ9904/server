const jsonwebtoken = require('jsonwebtoken');

const {User} = require('../models');

const validJWT = async (req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            info:'No tenemos un token en la petición'
        })
    }
    try {
        const {uid} = jsonwebtoken.verify(token, process.env.SECRETORPTIVATEKEY);
        //validar usuario
        const usuario = await User.findById(uid);
        if(!usuario){
            return res.status(400).json({
                info:'Token no valido, usuario no existe'
            })
        }
        if(!usuario.estado){
            return res.status(400).json({
                info:'Token no valido usuario no disponible'
            })
        }

        req.usuario=usuario;

        next();
    } catch (err) {
        console.log(err)
        res.status(400).json({
            info:'Token no valido'
        })
    }
}

const validaRol = (...roles)=>{
    return (req,res,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                info:'Se esta intentado rol sin validar usuario primero'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(400).json({
                info:'El suario no tiene permiso'
            })
        }
        next();
    }
}
module.exports = {validJWT, validaRol};