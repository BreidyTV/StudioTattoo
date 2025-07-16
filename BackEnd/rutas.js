var usuariosController = require("./api/controladores/usuariosController.js").usuariosController


app.post("/usuarios/guardar", function(request, response){  
    usuariosController.guardar(request, response)
})

app.get("/usuarios/cargarTodas", function(request, response){  
    usuariosController.cargarTodas(request, response)
})

app.get("/usuarios/cargarId/:cedula", function(request, response){  
    usuariosController.cargarId(request, response)
})

app.put("/usuarios/actualizar", function(request, response){  
    usuariosController.actualizar(request, response)
})

app.delete("/usuarios/eliminar", function(request, response){  
    usuariosController.eliminar(request, response)
})

app.post("/usuarios/registrar", function(request, response){  
    usuariosController.registrar(request, response)
})

app.post("/usuarios/login", function(request, response){  
    usuariosController.login(request, response)
})

app.get("/usuarios/activar/:email/:codigo", function(request, response){  
    usuariosController.activar(request, response)
})

app.post("/usuarios/solicitudRecuperarPass", function(request, response){  
    usuariosController.solicitudRecuperarPass(request, response)
})

app.post("/usuarios/recuperarPass", function(request, response){  
    usuariosController.recuperarPass(request, response)
})