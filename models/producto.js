const {Schema,model} = require('mongoose');

const schemaProducto = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        require: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        require: true
    },
    decripcion:{type: String},
    disponible:{type: Boolean, default: true},
    img:{type:String}
});



schemaProducto.methods.toJSON = function(){
    const { __v, _id, ...producto } = this.toObject();
    producto.uid=_id;    
    return producto;
}

module.exports = model('Producto', schemaProducto)