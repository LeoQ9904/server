const { response, request } = require("express")
const { isValidObjectId } = require("mongoose")

const {User,Producto,Categoria} = require('../models')

const coleccionesPermitidas = [
    'user',
    'producto',
    'categoria'
]

const bUser = async (termino = '', res=response)=>{
    const esMongoId = isValidObjectId( termino );
    if(esMongoId){
        const user = await User.findById(termino);
        return res.json({
            results: (user)? [user] : []
        })
    }
    const regEx = new RegExp( termino, 'i');//averiguar más sobre expreciones regulares 

    const user = await User.find({
        $or: [{nombre:regEx},{correo: regEx}],
        $and: [{estado:true}]
    });    
    res.json({        
        results: user
    })     
}
const bProducto = async (termino = '', res=response)=>{
    const esMongoId = isValidObjectId( termino );
    if(esMongoId){
        const producto = await Producto.findById(termino)
            .populate('categoria','nombre');
        return res.json({
            results: (producto)? [producto] : []
        })
    }
    const regEx = new RegExp( termino, 'i');//averiguar más sobre expreciones regulares 

    const producto = await Producto.find({
        $or: [{nombre:regEx}],
        $and: [{estado:true}]
    }).populate('categoria','nombre');    

    res.json({        
        results: producto
    })     
}
const bCategoria = async (termino = '', res=response)=>{
    const esMongoId = isValidObjectId( termino );
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria)? [categoria] : []
        })
    }
    const regEx = new RegExp( termino, 'i');//averiguar más sobre expreciones regulares 

    const categoria = await Categoria.find({
        $or: [{nombre:regEx}],
        $and: [{estado:true}]
    });    
    res.json({        
        results: categoria
    })     
}

const buscar = async (req=request,res=response)=>{
    const {termino,coleccion} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Coleccion no permitida. Colecciones permitidas: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'user':
            bUser(termino,res);
            break;
        case 'producto':
            bProducto(termino,res)
            break;
        case 'categoria':
            bCategoria(termino,res)
            break;
    
        default:
            res.status(500).json({
                msg:"No tengo configurada la busqueda para esa coleccion"
            })
            break;
    }


}

module.exports = {
    buscar
}