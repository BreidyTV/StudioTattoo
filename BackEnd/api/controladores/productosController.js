const { config } = require("../../config.js")
var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}


productosController.guardar = function(request, response){

    //1. Capturar las variables
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        cantidad:request.body.cantidad,
        precio:request.body.precio,
        descripcion:request.body.descripcion,
        estado:request.body.estado,
    }

    //2. Validar la información
    if(post.codigo == undefined || post.codigo == null || post.codigo.trim() == ""){
        response.json({state:false, mensaje:"El campo código es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje:"El campo imagen es obligatorio"})
        return false
    }
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }
    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    //4. ver la respuesta del modelo existeCodigo
    productosModel.existeCodigo(post, function(existe){
        if(existe.length == 0){
            productosModel.guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"El elemento fue almacenado correctamente"})
                }
                else {
                    response.json({state:false, mensaje:"Se presento un error al guardar"})
                }
            })
        }
        else {
            response.json({state:false, mensaje:"El codigo del elemento ya existe, intente con otro"})
        }
    })
}

productosController.cargarTodas = function(request, response){
    productosModel.cargarTodas(null, function(respuesta){
        response.json(respuesta)
    })
}

productosController.cargarTodasCliente = function(request, response){
    productosModel.cargarTodasCliente(null, function(respuesta){
        response.json(respuesta)
    })
}

productosController.cargarId = function(request, response){
    var post = {
        _id:request.params._id
    }

    if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }
    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo Id debe ser de 24 caracteres"}) 
        return false
    }

    productosModel.cargarId(post, function(respuesta){
        response.json(respuesta)
    })

}

productosController.actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        cantidad:request.body.cantidad,
        precio:request.body.precio,
        descripcion:request.body.descripcion,
        estado:request.body.estado,
    }

    if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje:"El campo imagen es obligatorio"})
        return false
    }
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }
    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    productosModel.existeId(post, function(existe){
        if(existe.length == 0){
            response.json({state:false, mensaje:"El Id que desea actualizar, no existe"})
        }
        else {
            productosModel.actualizar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se ha actualizado el elemento"})
                }
                else {
                    response.json({state:false, mensaje:"Se presento un error al actualizar el elemento"})
                }
            })
        }
    })    
}

productosController.eliminar = function(request, response){
    var post = {
        _id:request.body._id,
    }

    if(post._id == undefined || post._id == null || post._id.trim() == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productosModel.existeId(post, function(existe){
        if(existe.length == 0){
            response.json({state:false, mensaje:"El Id que desea eliminar, no existe"})
        }
        else {
            productosModel.eliminar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se ha eliminado el elemento"})
                }
                else {
                    response.json({state:false, mensaje:"Se presento un error al eliminar el elemento"})
                }
            })
        }
    })
}



module.exports.productosController = productosController