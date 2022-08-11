const jwt = require('jsonwebtoken');

const generarJWT = (uid='')=>{
    return new Promise ((rs,rj)=>{
        const payload = {uid};
        jwt.sign( payload, process.env.SECRETORPTIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                rj('No se pudo generar el token')
            }else{
                rs(token);
            }
        } )
    })
}

module.exports={
    generarJWT
}