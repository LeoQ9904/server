const {Schema,model} = require('mongoose');

const schemaRole = Schema({
    rol:{
        type: String,
        required: [true,'Elrol es obligatorio']
    }
});

module.exports = model('Role', schemaRole)