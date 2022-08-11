const validarArchivosubir = (req,res,next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ){
        return res.status(400).json({msg:'no hay archivos que subir'});
    }

    next();
}

module.exports={
    validarArchivosubir
}