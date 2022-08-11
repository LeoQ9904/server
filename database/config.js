const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {        
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,                 
        });

        console.log('base de datos conectada!!')
    } catch (error) {
        console.log(error);
        throw new Error('error al conectar a db');
    }
};

module.exports = {
    dbConnection
}
