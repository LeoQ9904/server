const path = require('path');
const fs=require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers/subir-archivo");
const { User, Producto } = require("../models");


const cargarArchivo = async (req,res)=>{
    try {          
            const nombre = await subirArchivo(req.files,undefined,'prueba');        
            res.json({nombre})
    } catch (msg) {
        res.status(400).json({msg})
    }
    
}

const actualizarImagenCloudinary = async (req,res)=>{
    const {coleccion,id}=req.params;
  
    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({msg:"El id no existe"})
                }
        break;
        case 'producto':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg:"El id no existe"})
            } 
        break;

        default:
            return res.status(500).json({msg:"error no calculado, no se tiene funcion para coleccion enviada"});
                   
    }

    //limpiar imagnes
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length -1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }
    
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );
    
}
const actualizarImagen = async (req,res)=>{
    const {coleccion,id}=req.params;
  
    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({msg:"El id no existe"})
                }
        break;
        case 'producto':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg:"El id no existe"})
            } 
        break;

        default:
            return res.status(500).json({msg:"error no calculado, no se tiene funcion para coleccion enviada"});
                   
    }

    //limpiar imagnes
    if(modelo.img){
        const pathImgen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImgen)){
            fs.unlinkSync(pathImgen);
        }
    }

    const imguploaded = await subirArchivo(req.files,undefined,coleccion);                              
    modelo.img = imguploaded;
    modelo.save();

    return res.status(200).json({modelo});
                
}
const mostrarImagen = async (req,res)=>{
    const {coleccion,id}=req.params;
  
    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({msg:"El id no existe"})
                }
        break;
        case 'producto':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg:"El id no existe"})
            } 
        break;

        default:
            return res.status(500).json({msg:"error no calculado, no se tiene funcion para coleccion enviada"});
                   
    }

    //limpiar imagnes
    if(modelo.img){
        const pathImgen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImgen)){
           return res.sendFile(pathImgen);
        }
    }
    const pathImgen = path.join(__dirname,'../assets/no-image.jpg');
    return res.sendFile(pathImgen);
                
}
                
            

module.exports={
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen,

}  