const path = require('path');
const { v4: uuid} =require('uuid');

const subirArchivo = (files,extencionV = ['png','jpeg','jpg'],carpeta='')=>{
    return new Promise((resolve, reject)=>{

        const { archivo } = files;

    //tomar extension o tipo de archivo 
        // se separa el nombre por . asi se tiene aparte la extencion y el nomobre
        //como es un array, que toma el length y se le resta 1, para tomar la ultima posicion 
    const nombreCortado = archivo.name.split('.');
    const ext = nombreCortado[nombreCortado.length - 1];

    //validar extención    
    if(!extencionV.includes( ext )){
        return reject(`extencion no valida . ${extencionV}`);
    }
 
    const nombreNew = uuid() + '.' + ext; //renombrando el archivo con un id unico 
    const uploadPath = path.join( __dirname, '../uploads/',carpeta,nombreNew);

    archivo.mv(uploadPath, (err)=>{
        if(err){
            return reject(err);
        }
        resolve(nombreNew)
    })
    })
}

module.exports={
    subirArchivo
}