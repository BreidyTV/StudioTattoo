const mongoose = require("mongoose")
var Schema = mongoose.Schema 
var logSesionesModel = {}

var logSesionesSchema = new Schema({
    email:String,
    numeroSesiones:{type:Number, default:1}   //el 1 significa que siempre arranque con 1 sesión iniciada
})

const myModel = mongoose.model("logSesiones",logSesionesSchema)

logSesionesModel.IncrementSesion = function(post, callback){
    myModel.updateOne({email:post.email},{ $inc:{numeroSesiones:1}}).then((respuesta) => {
        return callback({state:true})
    })
}

logSesionesModel.buscar = function(post, callback){
    myModel.find({email:post.email}).then((respuesta) => {
        return callback(respuesta)
    })
}

logSesionesModel.guardar = function(post, callback){
    const instancia = new myModel
    instancia.email = post.email
    instancia.save().then((respuesta) => {
        return callback({state:true})
    })
}

logSesionesModel.sesionesActivas = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback(respuesta)
    })
}

module.exports.logSesionesModel = logSesionesModel