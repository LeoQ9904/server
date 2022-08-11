const {Producto} = require('../models');


const getProductos = async (req,res)=>{
    const {limite=10,desde=0} =req.body;
    const query = {estado:true};

    const productos = await Producto.find(query)
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Producto.countDocuments(query);

    res.json({
        total,
        productos
    })
}

const  getProducto = async (req,res)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate('categoria','nombre');
    res.json({
        producto
    })
}

const postProducto = async (req,res)=>{
    let {nombre,precio,categoria,descripcion} = req.body;
    nombre = nombre.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
    const existeNombre = await Producto.findOne({nombre})
    if(existeNombre){
        return res.status(400).json({
            msg:"El producto ya existe"
        })
    }
    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        user:req.user._id
    }
    const producto = new Producto(data);
    producto.save();

    res.status(201).json({
        producto
    })
}

const putProducto = async (req,res)=>{
    const {id}=req.params;
    let {nombre,precio,categoria,descripcion} = req.body;
    (nombre) ? nombre.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase()): nombre;

    const data ={
        nombre,
        precio,
        categoria,
        descripcion,
        user:req.user._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data);
    res.json({
        producto
    })
}

const deleteProducto = async (req, res) =>{
    const {id} = req.params;
    const data = {
        estado:false,
        user: req.user.id
    }
    const producto = await Producto.findByIdAndUpdate(id, data);
    res.json({
        producto
    })
}


module.exports={
    getProducto,
    getProductos,
    putProducto,
    postProducto,
    deleteProducto
}