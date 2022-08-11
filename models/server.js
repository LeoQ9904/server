const express = require('express');
const cors = require('cors');
const  fileUpload  = require('express-fileupload')

const {dbConnection} = require('../database/config');

class server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.path = {
            user: '/api/user',
            buscar: '/api/buscar',
            categoria: '/api/categoria',
            uploads: '/api/uploads',
            producto: '/api/producto',
            auth: '/api/auth'
        }


        this.coneccionDB();
        this.middlewares();
        this.routes();    
    }
    async coneccionDB(){
        await dbConnection();
    }
    middlewares(){
        //Directorio public archivos que secargan
        this.app.use(cors());
        this.app.use( express.json() );
        this.app.use( express.static('public'));
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }
    routes(){
       this.app.use(this.path.auth, require('../routes/auth'));
       this.app.use(this.path.buscar, require('../routes/buscar'));
       this.app.use(this.path.categoria, require('../routes/categoria'));
       this.app.use(this.path.uploads, require('../routes/uploads'));
       this.app.use(this.path.producto, require('../routes/producto'));
       this.app.use(this.path.user, require('../routes/user'));
    }
    listen(){        
        //puerto en el q se escucha
        this.app.listen(this.port)
    }
}

module.exports = server;