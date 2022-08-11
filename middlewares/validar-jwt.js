const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");


const User = require('../models/user');

const validJWT = async (rq,rs,next) =>{
    const token = rq.header('x-token');
    if(!token){
        return rs.status(401).json({
            msg: 'no hay token en la petición'
        });
    }

    try {
        
        const { uid }=jsonwebtoken.verify(token, process.env.SECRETORPTIVATEKEY);
        
        //validar usuario
        const user = await User.findById(uid);
        if(!user){
            return rs.status(400).json({
                msg: 'Token no valido usuario no existe'
            })
        }

        //validar estado de usuario, si esta eliminado no podria hcer nada
        if(!user.estado){
            return rs.status(400).json({
                msg: 'Token no valido usuario en estado false'
            })
        }


        rq.user=user;



        next();
    } catch (error) {
        console.log(error);
        rs.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports={
    validJWT
}