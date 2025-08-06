const mongoose = require("mongoose")   //Base de datos
var Schema = mongoose.Schema 

var productosSchema = new Schema({    //Datos que voy a guardar en la base de datos - ESUQEMA
    codigo:String,
    nombre:String,
    imagen:String,
    cantidad:Number,
    precio:Number,
    descripcion:String,
    estado:String,
})

const myModel = mongoose.model("productos",productosSchema)

var productosModel = {}

//3. 
productosModel.existeCodigo = function(post, callback){
    //BUSCAR UN CODIGO
    myModel.find({codigo:post.codigo},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

productosModel.guardar = function(post, callback){
    //5. En BASE DE DATOS
    const instancia = new myModel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.imagen = post.imagen
    instancia.cantidad = parseInt(post.cantidad)
    instancia.precio = parseInt(post.precio)
    instancia.descripcion = post.descripcion
    instancia.estado = post.estado
    instancia.save().then((respuesta) => {                  //almacenamiento
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })            
}

productosModel.cargarTodas = function(post, callback){
    myModel.find({},{}).then((respuesta) => {                  //almacenamiento
        return callback(respuesta)
    }) 
}

productosModel.cargarTodasCliente = function(post, callback){
    myModel.find({estado:'Activo'},{}).then((respuesta) => {                  //almacenamiento
        return callback(respuesta)
    }) 
}

productosModel.cargarId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    }) 
}

productosModel.existeId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
}

productosModel.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
        imagen:post.imagen,
        cantidad:parseInt(post.cantidad),
        precio:parseInt(post.precio),
        descripcion:post.descripcion,
        estado:post.estado,
    }).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

productosModel.eliminar = function(post, callback){
    myModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}


module.exports.productosModel = productosModel
