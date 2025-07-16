const { config } = require("../../config.js")

var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel

var usuariosController = {}

var datos = []

usuariosController.guardar = function(request, response){
    var post = {
        cedula: request.body.cedula,
        nombre: request.body.nombre,
        apellido: request.body.apellido
    }

    if([undefined, null, ""].indexOf(post.cedula) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo cedula es obligatorio."}) 
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.status(500).json({state:false, mensaje:"El campo nombre es obligatorio."})  //Anadir code HTTP node STATUS(500) = Internal Several Error
        return false
    }
    if(post.apellido == undefined || post.apellido == null || post.apellido == ""){
        response.json({state:false, mensaje:"El campo apellido es obligatorio."})
        return false
    }

    usuariosModel.existeCedula(post,function(existe){
        if(existe.length == 0){ //guardar
            usuariosModel.guardar(post,function(respuesta){
                if(respuesta.state == true){
                response.json({state:true,mensaje:"Item almacenado",data:[]})
                }
                else{
                    response.json({state:false,mensaje:"Error al guardar",data:[]})
                }
            })
        }
        else {
            response.json({state:false,mensaje:"La cedula ya existe en nuestra base de datos"})
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
        cedula: request.params.cedula,
    }

    if([undefined, null, ""].indexOf(post.cedula) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo cedula es obligatorio"}) 
        return false
    }

    usuariosModel.cargarId(post, function(respuesta){
    response.json({state:true, datos:respuesta}) 
    })
}

usuariosController.actualizar = function(request, response){
    var post = {
        cedula: request.body.cedula,
        nombre: request.body.nombre,
        apellido: request.body.apellido
    }

    if([undefined, null, ""].indexOf(post.cedula) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo cedula es obligatorio."}) 
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.status(500).json({state:false, mensaje:"El campo nombre es obligatorio."})  //Anadir code HTTP node STATUS(500) = Internal Several Error
        return false
    }
    if(post.apellido == undefined || post.apellido == null || post.apellido == ""){
        response.json({state:false, mensaje:"El campo apellido es obligatorio."})
        return false
    }

    // var posicion = datos.findIndex((item) => item.cedula == post.cedula) se cambia por existeCedula

    usuariosModel.existeCedula(post, function(existe){
        if(existe.length == 0){
        response.json({state:false, mensaje:"La cedula no existe en la base de datos."})
        return false
        }
        else{
            //post.posicion = existe.posicion               //sobrecarga de objetos POSTMAN
            usuariosModel.actualizar(post,function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Item actualizado"})
                }
            })
        }
    })  
}

usuariosController.eliminar = function(request, response){
    var post = {
        cedula: request.body.cedula,
    }

    if([undefined, null, ""].indexOf(post.cedula) >= 0){  //condición con array
        response.json({state:false, mensaje:"El campo cedula es obligatorio."}) 
        return false
    }

    /*var posicion = datos.findIndex((item) => item.cedula == post.cedula)
    if(posicion == -1){
        response.json({state:false, mensaje:"La cedula no existe en la base de datos."})
        return false
    }
    else{
        datos.splice(posicion,1)
        response.json({state:true, mensaje:"Registro eliminado"})
        return false
    }*/

    usuariosModel.existeCedula(post, function(existe){
        if(existe.length == 0){
        response.json({state:false, mensaje:"La cedula no existe en la base de datos."})
        return false
        }
        else{
            //post.posicion = existe.posicion               //sobrecarga de objetos POSTMAN
            usuariosModel.eliminar(post,function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se elimino el registro"})
                }
            })
        }
    })
}

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
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
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
                        html:   `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
                                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        <h2 style="color: #4a90e2; margin-bottom: 10px;">Bienvenido a <strong>${config.name}</strong></h2>
                                        <p style="font-size: 16px;">Gracias por registrarte. Para activar tu cuenta, utiliza el siguiente código o haz clic en el botón:</p>
                                        <div style="margin: 20px 0;">
                                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Tu código de activación:</p>
                                            <div style="display: inline-block; padding: 12px 24px; background-color: #f0f0f0; border: 1px dashed #ccc; border-radius: 5px; font-size: 20px; letter-spacing: 2px;">
                                            <span style="color: #333;">${azar}</span>
                                            </div>
                                        </div>
                                        <a target="_blank" href="${config.dominio}/usuarios/activar/${post.email}/${azar}"
                                            style="display: inline-block; background-color: #4a90e2; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; margin-top: 20px;">
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
                            response.json({state:true, mensaje:"Usuario registrado correctamente, verifique su correo electronico para activar la cuenta"})
                        }
                    })                    
                }
                else{
                    response.json({state:false, mensaje:"Se presento un error al registrar"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"El correo electronico ya esta en uso, intente con otro"})
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
            if(respuesta[0].estado == 'Inactivo'){
                response.json({state:false, mensaje:"Debe activar su cuenta, verifique su correo electronico"})
            }
            else{
                response.json({state:true, mensaje:"Bienvenid@ " + respuesta[0].nombre})
            } 
        }
    })
}

usuariosController.activar = function(request, response){
    var post = {
        email:request.params.email,
        codigo:request.params.codigo,
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
        response.json({state:false, mensaje:"El campo email es obligatorio"})
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
                        html:   `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
                                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        <h2 style="color: #4a90e2; margin-bottom: 10px;">Bienvenido a <strong>${config.name}</strong></h2>
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
                            response.json({state:true, mensaje:"Codigo de recuperación de contraseña enviado exitosamente, verifique su correo electronico"})
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
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }
    if(post.codigoRec == undefined || post.codigoRec == null || post.codigoRec.trim() == ""){
        response.json({state:false, mensaje:"El campo codigo recuperación es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.claveSecreta)

    usuariosModel.recuperarPass(post, function(respuesta){
        console.log(respuesta)
        if(respuesta == null){
            response.json({state:false, mensaje:"El email y/o el codigo de recuperación es invalido"})
        }
        else{
            response.json({state:true, mensaje:"Su contraseña ha sido actualizada exitosamente"})
        }
    })

}

module.exports.usuariosController = usuariosController  //variable de exportación