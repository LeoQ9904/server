const {Role, User, Categoria, Producto} = require('../models');

const esRoleValido = async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la DB`)        
    }
    return true;
}
const emailExiste = async (correo='')=>{
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ya existe`)        
    }
    return true;
}
const userPorIdExiste = async (id='')=>{
    const existeId = await User.findById(id);
    if(!existeId){
        throw new Error(`El id no existe`)        
    }
    return true;
}
const categoriaPorIdExiste = async (id='')=>{
    const existeId = await Categoria.findById(id);
    if(!existeId){
        throw new Error(`El id no existe`)        
    }
    return true;
}
const productoPorIdExiste = async (id='')=>{
    const existeId = await Producto.findById(id);
    if(!existeId){
        throw new Error(`El id no existe`)        
    }
    return true;
}

const coleeccionesPermitidas=(coleccion='',colecciones=[])=>{
    if(!colecciones.includes(coleccion)){
        throw new Error(`Coleccion no permitida`);
    }
    return true;
}


module.exports={
    esRoleValido,
    emailExiste,
    userPorIdExiste,
    categoriaPorIdExiste,
    productoPorIdExiste,
    coleeccionesPermitidas
}