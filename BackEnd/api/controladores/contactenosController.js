var contactenosController = {}

contactenosController.enviarMensaje = function(request, response){

    var post = {
        quienSoy:request.body.quienSoy,
        nombre:request.body.nombre,
        email:request.body.email,
        telefono:request.body.telefono,
        mensaje:request.body.mensaje,
    }

    if(post.quienSoy == undefined || post.quienSoy == null || post.quienSoy.trim() == ""){
        response.json({state:false, mensaje:"El campo quien soy es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo correo electrónico es obligatorio"})
        return false
    }
    if(post.telefono == undefined || post.telefono == null || post.telefono.trim() == ""){
        response.json({state:false, mensaje:"El campo teléfono es obligatorio"})
        return false
    }    
    if(post.mensaje == undefined || post.mensaje == null || post.mensaje.trim() == ""){
        response.json({state:false, mensaje:"El campo mensaje es obligatorio"})
        return false
    }


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
        from:config.email.user, //DESDE DONDE ENVIO EL CORREO, MI CORREO
        to:config.email.user,  //MI CORREO
        cc:post.email,         //USUARIO QUE ENVIA EL CORREO
        subject: "Mensaje de contacto " + post.nombre,
        html:   `<div style="font-family: Arial, sans-serif; background-color: #000000; padding: 20px; color: #c6c5c5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #000000; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        
                        <!-- Encabezado -->
                        <h2 style="color: #a52a2a; margin-bottom: 10px;">Bienvenid@ a <strong>STUDIO TATTOO</strong></h2>
                        <br>
                        <br>

                        <!-- Datos del remitente -->
                        <p style="font-size: 16px; color: #c6c5c5; margin: 8px 0;">
                        <strong style="color:#c6c5c5;">Soy </strong> ${post.quienSoy}
                        </p>
                        <p style="font-size: 16px; color: #c6c5c5; margin: 8px 0;">
                        <strong style="color:#c6c5c5;">Mi nombre es </strong> ${post.nombre}
                        </p>
                        <p style="font-size: 16px; color: #c6c5c5; margin: 8px 0;">
                        <strong style="color:#c6c5c5;">Mi correo electrónico es </strong> ${post.email}
                        </p>
                        <p style="font-size: 16px; color: #c6c5c5; margin: 8px 0;">
                        <strong style="color:#c6c5c5;">Mi teléfono es </strong> ${post.telefono}
                        </p>
                        <br>

                        <!-- Mensaje -->
                        <div style="margin: 25px 0; padding: 16px; background-color: #111111; border-left: 4px solid #a52a2a; border-radius: 5px; text-align: left;">
                        <p style="font-size: 14px; color: #c6c5c5; margin: 0;">
                            <strong style="color:#c6c5c5; font-size: 16px">Mensaje:</strong><br><br>
                            ${post.mensaje}
                            <br>
                        </p>
                        </div>

                        <br><br><br>
                        <p style="font-size: 16px; color: #a52a2a; margin: 8px 0;"> Gracias por comunicarte con nosotros, en brevedad daremos respuesta a tu mensaje.</p>

                        <!-- Pie -->
                        <br>
                        <br>
                        <p style="font-size: 12px; color: #c6c5c5; margin-top: 20px;">
                        Este correo fue generado automáticamente desde la zona de contacto de <strong style="color:#a52a2a;">STUDIO TATTOO</strong>. Si no lo esperabas, puedes ignorarlo.
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
            response.json({state:true, mensaje:"¡Hemos recibido tú mensaje! Gracias por comunicarte con nosotros, te enviamos una copia del mismo a tu correo electrónico"})
        }
    })     

}



module.exports.contactenosController = contactenosController