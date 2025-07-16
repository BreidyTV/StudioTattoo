const mongoose = require("mongoose")   //Base de datos
var Schema = mongoose.Schema 

var usuariosSchema = new Schema({    //Datos que voy a guardar en la base de datos - ESUQEMA
    cedula:String,
    nombre:String,
    apellido:String,
    email:String,
    password:String,
    estado:String,
    codigoact:String,
    codigoRec:String,
    rol:String,                 //Permisos a un usuario (ej: administrador, cliente, almacenista....)
})

const myModel = mongoose.model("usuarios",usuariosSchema)    // Ponerle nombre a la colección - MODELADO


var datos = []
var usuariosModel = {}


usuariosModel.registrar = function(post, callback){
    const instancia = new myModel       //En BASE DE DATOS
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.estado = 'Inactivo'
    instancia.codigoact = post.codigo
    instancia.rol = "cliente"

    instancia.save().then((respuesta) => {  //respuesta del servidor (mongo)
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
    // datos.push(post)          en POSTMAN  
}

usuariosModel.login = function(post, callback){
    myModel.find({email:post.email,password:post.password}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.activar = function(post, callback){
    myModel.findOneAndUpdate({email:post.email, codigoact:post.codigo},{estado:"Activo"}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.solicitudRecuperarPass = function(post, callback){
    myModel.findOneAndUpdate({email:post.email},{codigoRec:post.codigo}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usuariosModel.recuperarPass = function(post, callback){
    myModel.findOneAndUpdate({email:post.email,codigoRec:post.codigoRec},{password:post.password,codigoRec:""}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usuariosModel.existeEmail = function(post, callback){
    myModel.find({email:post.email},{}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.guardar = function(post, callback){
    const instancia = new myModel       //En BASE DE DATOS
    instancia.cedula = post.cedula
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.rol = "cliente"
    instancia.estado = 'Activo'
    instancia.save().then((respuesta) => {  //respuesta del servidor (mongo)
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
    // datos.push(post)          en POSTMAN
    
}

usuariosModel.existeCedula = function(post, callback){
    myModel.find({cedula:post.cedula},{}).then((respuesta) => {     //MONGODB
    return callback(respuesta)
    })
    //var posicion = datos.findIndex((item) => item.cedula == post.cedula) // -1 si no la encuentra, de 0 a infinito si la encuentra POSTMAN
    //return callback({posicion:posicion})
}

usuariosModel.cargarTodas = function(post, callback){
    myModel.find({},{__v:0,password:0}).then((respuesta) => { // __v:0 para que no se visualice ese dato
        return callback({datos:respuesta})
    })
    
}

usuariosModel.cargarId = function(post, callback){
    myModel.find({cedula:post.cedula},{__v:0,password:0}).then((respuesta) => { // __v:0 para que no se visualice ese dato
        return callback({datos:respuesta})
    })
    
    // var posicion = datos.findIndex((item) => item.cedula == post.cedula) // -1 si no la encuentra, de 0 a infinito si la encuentra POSTMAN
    // if(posicion == -1){
    //     return callback({datos:[]}) 
    // }
    // else {
    //     return callback({datos:[datos[posicion]]})
    // }
    // return callback({posicion:posicion})
}

usuariosModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({cedula:post.cedula},{  //busqueda
        nombre:post.nombre,                            //Parametros a actualizar
        apellido:post.apellido,
    }).then((respuesta) => {
        return callback({state:true})                   //confirmación
    }).catch((error) => {
        console.log(error)
        return callback({state:false})

    })

    // datos[post.posicion].nombre = post.nombre          POSTMAN
    // datos[post.posicion].apellido = post.apellido 
    
}

usuariosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({cedula:post.cedula}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})

    })
    
    //datos.splice(post.posicion,1)     POSTMAN
    //return callback({state:true})
}

module.exports.usuariosModel = usuariosModel