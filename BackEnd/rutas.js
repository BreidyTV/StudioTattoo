const session = require("express-session")
var usuariosController = require("./api/controladores/usuariosController.js").usuariosController
var security = require("./midleware/security.js").security


//USUARIOS
var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

app.post("/usuarios/guardar", security.soloAdmin, function(request, response){  
    usuariosController.guardar(request, response)
})

app.get("/usuarios/cargarTodas", security.soloAdmin, function(request, response){  
    usuariosController.cargarTodas(request, response)
})

app.get("/usuarios/cargarId/:_id", security.soloAdmin, function(request, response){  
    usuariosController.cargarId(request, response)
})

app.put("/usuarios/actualizar", security.soloAdmin, function(request, response){  
    usuariosController.actualizar(request, response)
})

app.delete("/usuarios/eliminar", security.soloAdmin, function(request, response){  
    usuariosController.eliminar(request, response)
})

app.post("/usuarios/registrar", function(request, response){  
    usuariosController.registrar(request, response)
})

app.post("/usuarios/login", function(request, response){  
    usuariosController.login(request, response)
})

app.post("/usuarios/activar", function(request, response){  
    usuariosController.activar(request, response)
})

app.post("/usuarios/solicitudRecuperarPass", function(request, response){  
    usuariosController.solicitudRecuperarPass(request, response)
})

app.post("/usuarios/recuperarPass", function(request, response){  
    usuariosController.recuperarPass(request, response)
})

app.post("/usuarios/estado", function(request, response){  
    response.json(request.session)
})

app.post("/usuarios/logOut", function(request, response){
    request.session.destroy()
    response.json({state:true, mensaje:"Sesión cerrada"})
})

app.post("/usuarios/actualizarPass", function(request, response){  
    usuariosController.actualizarPass(request, response)
})

app.post("/usuarios/miPerfil", function(request, response){  
    usuariosController.miPerfil(request, response)
})

app.post("/usuarios/actualizarMiPerfil", function(request, response){  
    usuariosController.actualizarMiPerfil(request, response)
})


//PRODUCTOS
var productosController = require("./api/controladores/productosController.js").productosController

app.post("/productos/guardar", security.soloAdmin, function(request, response){  
    productosController.guardar(request, response)
})

app.get("/productos/cargarTodas", security.soloAdmin, function(request, response){  
    productosController.cargarTodas(request, response)
})

app.get("/productos/cargarId/:_id", function(request, response){  
    productosController.cargarId(request, response)
})

app.put("/productos/actualizar", security.soloAdmin, function(request, response){  
    productosController.actualizar(request, response)
})

app.delete("/productos/eliminar", security.soloAdmin, function(request, response){  
    productosController.eliminar(request, response)
})

app.get("/productos/cargarTodasCliente", function(request, response){  
    productosController.cargarTodasCliente(request, response)
})


//ANEXOS
var anexosController = require("./api/controladores/anexosController.js").anexosController
app.post("/anexos/anexosProductos", security.soloAdmin, function(request, response){  
    anexosController.anexosProductos(request, response)
})