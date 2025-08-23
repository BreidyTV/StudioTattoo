const mongoose = require("mongoose")   //Base de datos
var Schema = mongoose.Schema 

var usuariosSchema = new Schema({    //Datos que voy a guardar en la base de datos - ESUQEMA
    nombre:String,
    email:String,
    password:String,
    estado:String,
    fechaNacimiento:String,
    codigoact:String,
    codigoRec:String,
    rol:String,                 //Permisos a un usuario (ej: administrador, cliente, almacenista....)
})

const myModel = mongoose.model("usuarios",usuariosSchema)    // Ponerle nombre a la colección - MODELADO


var datos = []
var usuariosModel = {}


// USUARIO

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

usuariosModel.actualizarPass = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},{  //busqueda
        password:post.password,                            //Parametros a actualizar
    }).then((respuesta) => {
        return callback({state:true})                   //confirmación
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usuariosModel.actualizarMiPerfil = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},{               //busqueda
        nombre:post.nombre,                            //Parametros a actualizar
        fechaNacimiento:post.fechaNacimiento,
    }).then((respuesta) => {
        return callback({state:true})                   //confirmación
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}


// ADMINISTRADOR

usuariosModel.guardar = function(post, callback){
    const instancia = new myModel       //En BASE DE DATOS
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.fechaNacimiento = post.fechaNacimiento
    instancia.password = post.password
    instancia.rol = post.rol
    instancia.estado = post.estado
    instancia.save().then((respuesta) => {  //respuesta del servidor (mongo)
        console.log(respuesta)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    }) 
}

usuariosModel.cargarTodas = function(post, callback){
    myModel.find({},{__v:0,password:0}).then((respuesta) => { // __v:0 para que no se visualice ese dato
        return callback({datos:respuesta})
    })
    
}

usuariosModel.cargarId = function(post, callback){
    myModel.findById(post._id,{__v:0,password:0}).then((respuesta) => { // __v:0 para que no se visualice ese dato
        return callback({datos:respuesta})
    })
}

usuariosModel.existe_id = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {     //MONGODB
    return callback(respuesta)
    })
}

usuariosModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},{  //busqueda
        nombre:post.nombre,                            //Parametros a actualizar
        fechaNacimiento:post.fechaNacimiento,
        estado:post.estado,
        rol:post.rol,
    }).then((respuesta) => {
        return callback({state:true})                   //confirmación
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usuariosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

module.exports.usuariosModel = usuariosModel