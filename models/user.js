const { Schema, model} = require('mongoose');

const schemaUser =  Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,       
    },
    rol: {
        type: String,
        required: [true],
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

schemaUser.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid=_id;
    return user;
} 

module.exports = model('User', schemaUser);