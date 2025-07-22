var security = {}

security.soloAdmin = function(request, response, next){
    console.log(request.originalUrl)
    console.log(request.session.rol)

    var rol = request.session.rol
    if(rol == undefined || rol == null || rol == ""){
        response.json({state:false, mensaje:"Debe iniciar sesión"})
        return false
    }
    else{
        if(rol == "Administrador"){
            next()
        }
        else{
            response.json({state:false, mensaje:"Solo administradores tienen acceso a esta Api"})
            return false
        }
    }
}

module.exports.security = security