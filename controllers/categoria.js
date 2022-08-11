const {Categoria} = require("../models");
const categoria = require("../models/categoria");



////Obtener todas las categorias - no restringir 
const getCategorias = async (req,res)=>{
    const  { limite=3, desde=0 }  = req.query;
    const query = {estado:true}

    const categoriasDB = await Categoria.find(query)
    .populate('user','nombre')
    .skip(Number(desde))
    .limit(Number(limite));
    const total = await Categoria.countDocuments(query);
    res.json({
        total,
        categoriasDB
    })
}
////Obtener categoria por id - publico
const getCategoria = async (req,res)=>{
    const {id} = req.params;
    const categoriaDB = await Categoria.findOne({_id:id,estado:true})
        .populate('user','nombre');
    res.json({        
        categoriaDB
    })
}
////crear categoria - privado - cualquier token
const postCategorias = async (req,res)=>{
    const nombre = req.body.nombre.toUpperCase();//pasamos el dato a mayusculas 
    
    const categoriaDB = await Categoria.findOne({nombre}); //hacemos una consulta a la db, para saber si ya existe

    if(categoriaDB){ //preguntamos si nos retorno algun valor o no
        return res.status(400).json({
            msg:"La categoria ya existe"
        })
    }

    //generar data que se va a alamacenar. 

    const data = {
        nombre,
        user: req.user._id
    }

    const categoria = new Categoria(data)
    await categoria.save();

    res.json({
        msg:"todo ok",
        categoria
    })
}
////Actualizar categoria por id - privado - ADMIN_ROL
const putCategoria = async (req,res)=>{
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();//pasamos el dato a mayusculas 
    
    //generar data que se va a alamacenar. 

    const data = {
        nombre,
        user: req.user._id
    }

    const categoriaUp = await Categoria.findByIdAndUpdate(id,data);

    res.json({
        categoriaUp
    })
}
////eliminar categoria -privado - ADMIN_ROL
const deleteCategoria = async (req,res)=>{
    const {id} = req.params;
    const categoriadb = await Categoria.findById(id);

    if(!categoriadb.estado){
        return res.status(400).json({
            msg:"Esta intentado eliminaro una categoria ya eliminada"
        })
    }

    const data = {
        estado:false,
        user: req.user._id
    }

    const categoriaDl = await Categoria.findByIdAndUpdate(id,data);


    res.json({
        categoriaDl
    })
}
module.exports ={
    getCategorias,
    postCategorias,
    getCategoria,
    putCategoria,
    deleteCategoria
}