const {response, request}=require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT}=require('../helpers/generar-jwt');

const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req=request, res=response) => {

    const {correo,password}=req.body;

    try {
        const user  = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }
        if(!user.estado ){ //es como si poniera user.status === false
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword ){ //es como si poniera user.status === false
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - contraseña'
            });
        }
        
        //generar token JWT

         const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msq:'Hable con el administrador'
        })
    }
};

const sinoutGoogle = async (req, res)=>{
    const {id_token} = req.body;
    try { 
        const {correo,nombre,img} =  await googleVerify( id_token );
        let user = await User.findOne({correo});

        if(!user){
            //el usuario no existe, tengo q crearlo
            const data = {
                nombre,
                correo,
                password: 'nn',
                img,
                google: true
            };
            user = new User( data );
            await user.save();
        }
        //si el user existe en la base de datos
            //verificar su estado
        if (!user.estado){
            return res.status(401).json({
                msg:'Usuario bloqueado hable con el admin'
            });
        }

        //generar token JWT

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        
        res.status(400).json({
            msg:'token de google no es valido'
        })   
    }     
}

const renovarToken = async (req,res) =>{
    const {usuario} = req;
     //generar token para la validacion de la informacion del usuario

    const token = await generarJWT(usuario.id);
    res.json({
        usuario,
        token
    });
}
module.exports ={
    login,
    sinoutGoogle,
    renovarToken
}