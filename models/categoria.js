const {Schema,model} = require('mongoose');

const schemaCategoria = Schema({
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
    }
});



schemaCategoria.methods.toJSON = function(){
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid=_id;    
    return categoria;
}

module.exports = model('Categoria', schemaCategoria)