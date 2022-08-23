const {response, request}=require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const userGet = async (req=request, res=response) => {
    const  { limite=3, desde=0 }  = req.query; //destructuración de parametros que se envian 
    const query = {estado:true}


    const users = await User.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
    const total = await User.countDocuments(query);
    res.json({
        total,
        users        
    })
};
const userPost = async (req, res=response) => {

    const {nombre,password,correo,rol} = req.body;
    const user = new User({nombre,password,correo,rol});         

    //encriptacion de contraseña
    const salt = bcryptjs.genSaltSync(); //---> saltos que da para incriptar, por defecto da 10,,, paa cambiarlo se pone entra los (100)
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();             
    res.json({
        user 
    })
};
const userPut = async (req, res=response) => {
    const {id} = req.params;
    const {_id, password,google,correo, ...resto} = req.body;

    //validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(); //---> saltos que da para incriptar, por defecto da 10,,, paa cambiarlo se pone entra los (100)
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user
    })
};
const userDelete = async (req, res=response) => {

    // const userautenticado = req.user;
    const {id}=req.params;
    const user = await User.findByIdAndUpdate(id, {estado:false});
    res.json({     
        user        
    })
};
const userIdGet = async(req=request,res=response)=>{
    const {nombre} = req.params;

    console.log(nombre)

    const user = await User.findOne({nombre})

    res.json({
        user,
    })
}

module.exports={
    userGet,
    userPut,
    userDelete,
    userPost,
    userIdGet
}