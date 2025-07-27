const { config } = require("../../config.js")

var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel

var usuariosController = {}


// ADMINISTRADOR

usuariosController.guardar = function(request, response){
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        rol: request.body.rol,
        estado: request.body.estado,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo correo electrónico es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo contraseña es obligatorio"})
        return false
    }
    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)

    usuariosModel.existeEmail(post,function(existe){
        if(existe.length == 0){ //guardar
            usuariosModel.guardar(post,function(respuesta){
                if(respuesta.state == true){
                response.json({state:true,mensaje:"Usuario almacenado",data:[]})
                }
                else{
                    response.json({state:false,mensaje:"Error al guardar",data:[]})
                }
            })
        }
        else {
            response.json({state:false,mensaje:"El correo electrónico ya existe, intente con otro"})
        }
    })    
}

usuariosController.cargarTodas = function(request, response){

    usuariosModel.cargarTodas({}, function(respuesta){
        response.json({state:true, datos:respuesta})
    })
     
}

usuariosController.cargarId = function(request, response){
   //var filtro = datos.filter((item) => item.cedula == request.params.cedula)  se elimina debido a que ya se creo un modelo a partir de la existencia de la cedula
    var post = {
        _id: request.params._id,
    }

    if([undefined, null, ""].indexOf(post._id) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo _id es obligatorio"}) 
        return false
    }
    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo Id debe ser de 24 caracteres"}) 
        return false
    }

    usuariosModel.cargarId(post, function(respuesta){
    response.json({state:true, datos:respuesta}) 
    })
}

usuariosController.actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado,
        rol: request.body.rol,
    }

    if([undefined, null, ""].indexOf(post._id) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo Id es obligatorio"}) 
        return false
    }
    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo Id debe ser de 24 caracteres"}) 
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.status(500).json({state:false, mensaje:"El campo nombre es obligatorio"})  //Anadir code HTTP node STATUS(500) = Internal Several Error
        return false
    }
    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }
    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    // var posicion = datos.findIndex((item) => item.cedula == post.cedula) se cambia por existeCedula

    usuariosModel.existe_id(post, function(existe){
        if(existe.length == 0){
        response.json({state:false, mensaje:"El id no existe en la base de datos"})
        return false
        }
        else{
            //post.posicion = existe.posicion               //sobrecarga de objetos POSTMAN
            usuariosModel.actualizar(post,function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Usuario actualizado"})
                }
            })
        }
    })  
}

usuariosController.eliminar = function(request, response){
    var post = {
        _id: request.body._id,
    }

    if([undefined, null, ""].indexOf(post._id) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo Id es obligatorio"}) 
        return false
    }
    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo Id debe ser de 24 caracteres"}) 
        return false
    }

    usuariosModel.existe_id(post, function(existe){
        if(existe.length == 0){
        response.json({state:false, mensaje:"El Id no existe en la base de datos"})
        return false
        }
        else{
            //post.posicion = existe.posicion               //sobrecarga de objetos POSTMAN
            usuariosModel.eliminar(post,function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Usuario eliminado"})
                }
            })
        }
    })
}


// USUARIO

usuariosController.registrar = function(request, response){
    var post = {                                                                                            //Captura de variables
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){                        //Verificación las variables cumplen o no
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo correo electrónico es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo contraseña es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)// Cifrado de información sencible con sha256

    //ACTIVACIÓN DE CUENTA
    var azar = "A-" + Math.floor(Math.random() * (9999 - 1000) + 1000)
    post.codigo = azar


    usuariosModel.existeEmail(post, function(existe){
        if(existe.length == 0){
            usuariosModel.registrar(post, function(respuesta){
                if(respuesta.state == true){

                    //ENVIO DE CORREO ELECTRONICO ANTES DE QUE SALGA EN PANTALLA "USUARIO REGISTRADO"
                    const transporter = nodemailer.createTransport({                    //1. CONFIGURACIÓN DE UESTRO CORREO SERVIDOR
                        host:config.email.host,  //Simple Mail Transfer Protocol (Protocolo simple de transferencia de correo)
                        port:config.email.port, //puerto de la extención del correo
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass,
                        }
                    })

                    var mailOptions = {                                                 //2. CONFIGURACIÓN DEL CORREO A ENVIAR
                        from:config.email.user, //DESDE DONDE ENVIO EL CORREO
                        to:post.email,  //USUARIO QUE SE REGISTRA
                        subject:"Verifica tu cuenta con el codigo: " + azar,
                        html:   `<div style="font-family: Arial, sans-serif; background-color: #000000ff; padding: 20px; color: #333;">
                                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px #c6c5c5);">
                                        <h2 style="color: #a52a2a; margin-bottom: 10px;">Bienvenido a <strong>${config.name}</strong></h2>
                                        <p style="font-size: 16px;">Gracias por registrarte. Para activar tu cuenta, utiliza el siguiente código o haz clic en el botón:</p>
                                        <div style="margin: 20px 0;">
                                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Tu código de activación:</p>
                                            <div style="display: inline-block; padding: 12px 24px; background-color: #f0f0f0; border: 1px dashed #ccc; border-radius: 5px; font-size: 20px; letter-spacing: 2px;">
                                            <span style="color: #333;">${azar}</span>
                                            </div>
                                        </div>
                                        <a target="_blank" href="${config.dominio}/activar/${post.email}/${azar}"
                                            style="display: inline-block; background-color: #a52a2a; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; margin-top: 20px;">
                                            Activar mi cuenta
                                        </a>
                                        <p style="font-size: 14px; color: #777; margin-top: 30px;">
                                            Si no solicitaste esta cuenta, puedes ignorar este mensaje.
                                        </p>
                                    </div>
                                </div>`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {                    //3. ENVIO DEL CORREO
                        if(error){
                            console.log(error)
                            response.json({state:false, mensaje:"Error, enviando el correo"})
                        }
                        else{
                            console.log(info)
                            response.json({state:true, mensaje:"Usuario registrado correctamente, verifica tu correo electronico para activar la cuenta"})
                        }
                    })                    
                }
                else{
                    response.json({state:false, mensaje:"Se presento un error al registrar"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"El correo electronico ya esta en uso, intenta con otro"})
        }
    })

}

usuariosController.login = function(request, response){
   var post = {                                                                                            //Captura de variables
        email:request.body.email,
        password:request.body.password,
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)

    usuariosModel.login(post, function(respuesta){
        if(respuesta.length == 0){
            response.json({state:false, mensaje:"Credenciales invalidas"})
        }
        else{
            if(respuesta[0].estado == 'Baneado'){
                response.json({state:false, mensaje:"Tu cuenta ha sido desactivada"})
                return false
            }
            if(respuesta[0].estado == 'Inactivo'){
                response.json({state:false, mensaje:"Debes activar tu cuenta, verifica tu correo electronico"})
                return false
            }

            if(respuesta[0].estado == 'Activo'){
            request.session.nombre = respuesta[0].nombre
            request.session.email = respuesta[0].email
            request.session.rol = respuesta[0].rol
            request.session._id = respuesta[0]._id

            response.json({state:true, mensaje:"Bienvenid@ " + respuesta[0].nombre})
            }
            else{
                response.json({state:false, mensaje:"Tu estado de cuenta no esta definido"})
            } 
        }
    })
}

usuariosController.activar = function(request, response){
    var post = {
        email:request.body.email,
        codigo:request.body.codigo,
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo correo electrónico es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo.trim() == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    usuariosModel.activar(post, function(respuesta){
        if(respuesta == null){
            response.json({state:false, mensaje:"El codigo de activación es invalido"})
        }
        else{
            response.json({state:true, mensaje:"Cuenta activada correctamente"})
        }
    })

}

usuariosController.solicitudRecuperarPass = function(request, response){
    var post = {
        email:request.body.email,
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo correo electrónico es obligatorio"})
        return false
    }

    post.codigo = "R-" + Math.floor(Math.random() * (9999 - 1000) + 1000)
    azar = post.codigo
    

    usuariosModel.solicitudRecuperarPass(post, function(respuesta){
        const transporter = nodemailer.createTransport({                    //1. CONFIGURACIÓN DE UESTRO CORREO SERVIDOR
                        host:config.email.host,  //Simple Mail Transfer Protocol (Protocolo simple de transferencia de correo)
                        port:config.email.port, //puerto de la extención del correo
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass,
                        }
                    })

                    var mailOptions = {                                                 //2. CONFIGURACIÓN DEL CORREO A ENVIAR
                        from:config.email.user, //DESDE DONDE ENVIO EL CORREO
                        to:post.email,  //USUARIO QUE SE REGISTRA
                        subject:"Recupera tu contraseña con el codigo: " + azar,
                        html:   `<div style="font-family: Arial, sans-serif; background-color: #000000ff; padding: 20px; color: #333;">
                                    <div style="max-width: 600px; margin: 0 auto; background-color: #f0f0f0; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        <h2 style="color: #a52a2a; margin-bottom: 10px;">Bienvenido a <strong>${config.name}</strong></h2>
                                        <p style="font-size: 16px;">Para recuperar tu cuenta, actializa la contraseña con el siguiente código:</p>
                                        <div style="margin: 20px 0;">
                                            <div style="display: inline-block; padding: 12px 24px; background-color: #f0f0f0; border: 1px dashed #ccc; border-radius: 5px; font-size: 20px; letter-spacing: 2px;">
                                            <span style="color: #333;">${azar}</span>
                                            </div>
                                        </div>
                                        <p style="font-size: 14px; color: #777; margin-top: 30px;">
                                            Si no solicitaste esta cuenta, puedes ignorar este mensaje.
                                        </p>
                                    </div>
                                </div>`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {                    //3. ENVIO DEL CORREO
                        if(error){
                            console.log(error)
                            response.json({state:false, mensaje:"Error, enviando el correo"})
                        }
                        else{
                            console.log(info)
                            response.json({state:true, mensaje:"Codigo de recuperación de contraseña enviado, verifica tu correo electrónico"})
                        }
                    })                    
    })



}

usuariosController.recuperarPass = function(request, response){
    var post = {
        email:request.body.email,
        codigoRec:request.body.codigoRec,
        password:request.body.password
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo cooreo electrónico es obligatorio"})
        return false
    }
    if(post.codigoRec == undefined || post.codigoRec == null || post.codigoRec.trim() == ""){
        response.json({state:false, mensaje:"El campo codigo recuperación es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo contraseña es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)

    usuariosModel.recuperarPass(post, function(respuesta){
        console.log(respuesta)
        if(respuesta == null){
            response.json({state:false, mensaje:"El email y/o el codigo de recuperación es invalido"})
        }
        else{
            response.json({state:true, mensaje:"Tu contraseña se ha actualizado"})
        }
    })

}

usuariosController.miPerfil = function(request, response){
    var post = {
        _id:request.session._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"Debes iniciar session para cargar los datos"})
        return false
    }

    usuariosModel.cargarId(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.actualizarMiPerfil = function(request, response){
    var post = {                                                    //Capturar los datos
        _id: request.session._id,                                //Recibe datos desde el inicio de session
        nombre:request.body.nombre
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"Debes iniciar session para actualizar sus datos"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    usuariosModel.actualizarMiPerfil(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Tus datos se ha actualizado"})
        }
        else{
            response.json({state:false, mensaje:"Se presento un error al actualizar los datos"})
        }
    })


}

usuariosController.actualizarPass = function(request, response){
    var post = {                                                    //Capturar los datos
        password: request.body.password,                             //recibe datos desde el FrontEnd
        _id: request.session._id                                //Recibe datos desde el inicio de session
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo nueva contraseña es obligatorio"})
        return false
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"Debes iniciar session para cambiar la contraseña"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)

    usuariosModel.actualizarPass(post,function(respuesta){
        request.session.destroy()                                               //Al actualizar la contraseña, te saca de la sesion
        response.json({state:true, mensaje:"Tu contraseña se ha actualizado"})
    })


}


module.exports.usuariosController = usuariosController  //variable de exportación