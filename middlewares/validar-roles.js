const esAdminrol = (rq,rs,next) =>{
    if(!rq.user){
        return rs.status(500).json({
            msg: 'Se esta intentando validar rol sin validar usuario primero'
        })
    }
    const {rol, nombre} = rq.user;
    if(!rol!=='ADMIN_ROL'){
        return rs.status(400).json({
            msg: 'El usuario no es administrador',nombre
        })
    }    
    next();
}
const tieneRol = (...roles) =>{ //...roles o ...resto, me concatena lo que venga en un array con el nombre roles
        return (rq,rs,next)=>{
            if(!rq.user){
                return rs.status(500).json({
                    msg: 'Se esta intentando validar rol sin validar usuario primero'
                })
            }
            if(!roles.includes(rq.user.rol)){
                return rs.status(400).json({
                    msg: 'El usuario no es administrador'
                })
            } 

            next();
        }
}

module.exports={
    esAdminrol,
    tieneRol
}