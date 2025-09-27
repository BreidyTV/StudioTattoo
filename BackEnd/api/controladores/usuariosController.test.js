const mongoose = require("mongoose")
global.config = require("../../config.js").config 
const usuariosController = require("./usuariosController.js").usuariosController  //vincilar el test unitario con el controlador
global.sha256 = require("sha256")
const usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
global.nodemailer = require("nodemailer")


//ADMINISTRADOR
// describe("post: /usuarios/guardar", () => {
//     let request
//     let response

//     beforeAll((done) => {               //Antes de empezar 
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
//             //console.log("Conexión correcta a MongoDB")
//             done()
//         }).catch((error) => {
//             //console.log(error)
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}}
//         response = {
//             json:jest.fn(),                //fn función
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     // test("debe sumar 2 numeros", (done) => {
//     //     var a = 5
//     //     var b = 6


//     //     expect(a+b).toBe(11)
//     //     done()
//     // })

//     test("Al guardar, el campo nombre es obligatorio", (done) => {
//         request.body = {
//             nombre: "",
//             email: "",
//             fechaNacimiento: "",
//             password: "",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
//         done()
//     })

//     test("Al guardar, el campo correo electrónico es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "",
//             fechaNacimiento: "",
//             password: "",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo correo electrónico es obligatorio"})
//         done()
//     })

//     test("Al guardar, el campo fecha de nacimiento es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "",
//             password: "",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo fecha de nacimiento es obligatorio"})
//         done()
//     })

//     test("Al guardar, el campo contraseña es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo contraseña es obligatorio"})
//         done()
//     })

//     test("Al guardar, el campo rol es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo rol es obligatorio"})
//         done()
//     })

//     test("Al guardar, el campo estado es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo estado es obligatorio"})
//         done()
//     })

//     test("Al guardar, debe almacenar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario almacenado",data:[]})
//             done()
//             },70);             //milisegundos
//         })

        
//     })

//     test("Al guardar, reportar que el usuario ya existe", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//             usuariosController.guardar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El correo electrónico ya existe, intente con otro"})
//             done()
//             },30);             //milisegundos

        
//     })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })

        
//     })

// })

// describe("get: /usuarios/cargarTodas", () => {
//     let request
//     let response

//     beforeAll((done) => {             
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      
//             done()
//         }).catch((error) => {
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}}
//         response = {
//             json:jest.fn(),                
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Al guardar, debe almacenar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//         usuariosModel.myModel.deleteMany({}).then((respuesta) => {

//             usuariosController.guardar(request, response)

//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario almacenado",data:[]})
//             done()
//             },70);             
//         })
//     })

//     test("Debe existir al menos un usuario creado", (done) => {
//             usuariosController.cargarTodas(request, response)
//             //console.log("---------->")
//             //onsole.log(response.json.mock.calls[0][0])            //para verificar hay datos en la consola y como entrar en el array
            
//             setTimeout(() => {
//                 expect(response.json.mock.calls[0][0].datos.datos.length).toBe(1)
//                 done()
//             },60);             
//         })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })      
//     })

// })

// describe("delete: /usuarios/eliminar", () => {
//     let request
//     let response

//     beforeAll((done) => {             
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      
//             done()
//         }).catch((error) => {
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}}
//         response = {
//             json:jest.fn(),                
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Al guardar, el campo nombre es obligatorio", (done) => {
//         request.body = {
//             nombre: "",
//             email: "",
//             fechaNacimiento: "",
//             password: "",
//             rol: "",
//             estado: "",
//         }

//         usuariosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
//         done()
//     })

//     test("Al eliminar, el campo Id es obligatorio", (done) => {
//         request.body._id = ""

//         usuariosController.eliminar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo Id es obligatorio"})
//         done()
//     })

//     test("Al eliminar, el campo Id debe ser de 24 caracteres", (done) => {
//         request.body._id = "xxx"

//         usuariosController.eliminar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo Id debe ser de 24 caracteres"})
//         done()
//     })

//     test("Al eliminar, debe haber al menos un usuario almacenado", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {

//             usuariosController.guardar(request, response)

//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario almacenado",data:[]})
//             done()
//             },70);             
//         })
//     })

//     test("Al eliminar, debe verificar si el Id existe", (done) => {
//         request.body._id = "68ba2bfc8036444926aa778a"

//         usuariosController.eliminar(request, response)
//         setTimeout(() => {
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El Id no existe en la base de datos"})
//         done()
//         },60);
//     })

//     test("Debe eliminar por medio de un Id existente", (done) => {
        
//         usuariosModel.myModel.find({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             request.body._id = respuesta[0]._id.toString()

//             usuariosController.eliminar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario eliminado"})
//             done()
//             },60);
//         })      
//     })

//     test("Verificar que no existen usuarios registrados", (done) => {
//         usuariosModel.myModel.find({email:"breidy_19@hotmail.com"}).then((respuesta) => {

//         usuariosController.eliminar(request, response)
//         setTimeout(() => {
//         expect(respuesta.length).toBe(0)
//         done()
//         },60);      
//         })
//     })

// })


// //CLIENTE
// describe("post: /usuarios/registrar", () => {
//     let request
//     let response

//     beforeAll((done) => {               //Antes de empezar 
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
//             //console.log("Conexión correcta a MongoDB")
//             done()
//         }).catch((error) => {
//             //console.log(error)
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}}
//         response = {
//             json:jest.fn(),                //fn función
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Al registrar, el campo nombre es obligatorio", (done) => {
//         request.body = {
//             nombre: "",
//             email: "",
//             password: "",
//         }

//         usuariosController.registrar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
//         done()
//     })

//     test("Al registrar, el campo correo electrónico es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "",
//             password: "",
//         }

//         usuariosController.registrar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo correo electrónico es obligatorio"})
//         done()
//     })
    
//     test("Al registrar, el campo contraseña es obligatorio", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             password: "",
//         }

//         usuariosController.registrar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo contraseña es obligatorio"})
//         done()
//     })

//     test("Al registrar, debe registrar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             password: "123456",
//         }

//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.registrar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario registrado correctamente, verifica tu correo electronico para activar la cuenta"})
//             done()
//             },5000);             //milisegundos
//         })      
//     })

//     test("Al registrar, debe decir el correo electronico ya existe", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             password: "123456",
//         }

//             usuariosController.registrar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El correo electronico ya esta en uso, intenta con otro"})
//             done()
//             },100);             //milisegundos
               
//     })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })
//     })

// })

// describe("post: /usuarios/activar", () => {
//     let request
//     let response

//     beforeAll((done) => {               //Antes de empezar 
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
//             //console.log("Conexión correcta a MongoDB")
//             done()
//         }).catch((error) => {
//             //console.log(error)
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}, session:{}}
//         response = {
//             json:jest.fn(),                //fn función
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Al activar, el campo correo electrónico es obligatorio", (done) => {
//         request.body = {
//             email: "",
//             codigo: "",
//         }

//         usuariosController.activar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo correo electrónico es obligatorio"})
//         done()
//     }) 
    
//     test("Al activar, el campo contraseña es obligatorio", (done) => {
//         request.body = {
//             email: "breidy_19@hotmail.com",
//             codigo: "",
//         }

//         usuariosController.activar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo codigo es obligatorio"})
//         done()
//     })

//     test("Al activar, debe registar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             password: "123456",
//         }

//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.registrar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario registrado correctamente, verifica tu correo electronico para activar la cuenta"})
//             done()
//             },5000);             //milisegundos
//         })      
//     })

//     test("Al activar, debe notificar si el codigo de activación es incorrecto", (done) => {
//         request.body = {
//             email: "breidy_19@hotmail.com",
//             codigo: "A-8457",
//         }

//         usuariosController.activar(request, response)
//         setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El codigo de activación es invalido"})
//         done()
//         }, 80);
        
//     })

//     test("Al activar, la cuenta debe quedar activa", (done) => {
//         request.body.email = "breidy_19@hotmail.com"
//         usuariosModel.myModel.find({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             request.body.codigo = respuesta[0].codigoact

//             usuariosController.activar(request, response)
//             setTimeout(() => {
//                 expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Cuenta activada correctamente"})
//                 done()
//             },80);
//         })
//     })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })
//     })
        
// })

// describe("post: /usuarios/login", () => {
//     let request
//     let response

//     beforeAll((done) => {               //Antes de empezar 
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
//             //console.log("Conexión correcta a MongoDB")
//             done()
//         }).catch((error) => {
//             //console.log(error)
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}, session:{}}
//         response = {
//             json:jest.fn(),                //fn función
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Para hacer login, el campo correo electrónico es obligatorio", (done) => {
//         request.body = {
//             email: "",
//             password: "",
//         }

//         usuariosController.login(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo correo electrónico es obligatorio"})
//         done()
//     }) 
    
//     test("Para hacer login, el campo contraseña es obligatorio", (done) => {
//         request.body = {
//             email: "breidy_19@hotmail.com",
//             password: "",
//         }

//         usuariosController.login(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo contraseña es obligatorio"})
//         done()
//     })

//     test("Al guardar, debe almacenar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//         usuariosModel.myModel.deleteMany({email: "breidy_19@hotmail.com"}).then((respuesta) => {
//                 usuariosController.guardar(request, response)
//                 setTimeout(() => {
//                 expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario almacenado",data:[]})
//                 done()
//                 },70);
//         })
//     })
    
//     test("Para hacer login, debe iniciar sesión", (done) => {
//         request.body = {
//             email: "breidy_19@hotmail.com",
//             password: "123456",
//         }

//         usuariosController.login(request, response)
//         setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Bienvenid@ " + "Breidy"})
//             done()
//         }, 70);
//     })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })
//     })

// })

// describe("post: /usuarios/miPerfil", () => {
//     let request
//     let response

//     beforeAll((done) => {               //Antes de empezar 
//         mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
//             //console.log("Conexión correcta a MongoDB")
//             done()
//         }).catch((error) => {
//             //console.log(error)
//         })
       
//     })

//     beforeEach(() => {
//         request = { body:{}, session:{}}
//         response = {
//             json:jest.fn(),                //fn función
//             status:jest.fn().mockReturnThis()
//         }
//     })

//     test("Al guardar, debe almacenar el usuario", (done) => {
//         request.body = {
//             nombre: "Breidy",
//             email: "breidy_19@hotmail.com",
//             fechaNacimiento: "02/19/1995",
//             password: "123456",
//             rol: "Administrador",
//             estado: "Activo",
//         }

//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario almacenado",data:[]})
//             done()
//             },70);             //milisegundos
//         })

        
//     })

//     test("Para ver mi perfil, debe iniciar sesión", (done) => {
//         request.body = {
//             email: "breidy_19@hotmail.com",
//             password: "123456",
//         }

//         usuariosController.login(request, response)
//         setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Bienvenid@ " + "Breidy"})
//             done()
//         }, 70);
//     })

//     test("Para ver mi perfil, el campo Id es obligatorio debe inciar sesión", (done) => {
//         request.body._id = ""
        

//         usuariosController.miPerfil(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Debes iniciar session para cargar los datos"})
//         done()
//     })
    
//     test("Para ver mi perfil, el campo Id es obligatorio", (done) => {
//         usuariosModel.myModel.find({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             request.session._id = respuesta[0]._id.toString()

//             usuariosController.miPerfil(request, response)
            
//             setTimeout(() => {
//                 //console.log(response.json.mock.calls[0][0].datos.nombre)
//                 expect(response.json.mock.calls[0][0].datos.nombre).toBe("Breidy")
//                 done()
//             },300);
//         })
               
//     })

//     test("Borrado de colección", (done) => {
        
//         usuariosModel.myModel.deleteMany({email:"breidy_19@hotmail.com"}).then((respuesta) => {
//             usuariosController.guardar(request, response)
//             expect(true).toBe(true)
//             done()
//         })
//     })

// })