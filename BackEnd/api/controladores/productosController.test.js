const mongoose = require("mongoose")
global.config = require("../../config.js").config 
const productosController = require("./productosController.js").productosController  //vincilar el test unitario con el controlador
const productosModel = require("../modelos/productosModel.js").productosModel


describe("post: /productos/guardar", () => {
    let request
    let response

    beforeAll((done) => {               //Antes de empezar 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
            //console.log("Conexión correcta a MongoDB")
            done()
        }).catch((error) => {
            //console.log(error)
        })
       
    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),                //fn función
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al guardar, el campo código es obligatorio", (done) => {
        request.body = {
            codigo: "",
            nombre: "",
            imagen: "",
            cantidad: "",
            precio: "",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo código es obligatorio"})
        done()
    })

    test("Al guardar, el campo nombre es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "",
            imagen: "",
            cantidad: "",
            precio: "",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
        done()
    })

    test("Al guardar, el campo imagen es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "",
            cantidad: "",
            precio: "",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo imagen es obligatorio"})
        done()
    })

    test("Al guardar, el campo cantidad es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "",
            precio: "",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo cantidad es obligatorio"})
        done()
    })

    test("Al guardar, el campo precio es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo precio es obligatorio"})
        done()
    })

    test("Al guardar, el campo descripcion es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo descripcion es obligatorio"})
        done()
    })

    test("Al guardar, el campo estado es obligatorio", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "",
        }

        productosController.guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo estado es obligatorio"})
        done()
    })

    test("Al guardar, debe almacenar el producto", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "Activo",
        }

        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
            done()
            },200);             //milisegundos
        })
    })

    test("Al guardar, reportar que el Producto ya existe", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "Activo",
        }

            productosController.guardar(request, response)
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El codigo del producto ya existe, intente con otro"})
            done()
            },30);             //milisegundos

        
    })

    test("Borrado de colección", (done) => {
        
        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            expect(true).toBe(true)
            done()
        })

        
    })
})

describe("get: /productos/cargarTodas", () => {
    let request
    let response

    beforeAll((done) => {             
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      
            done()
        }).catch((error) => {
        })
       
    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),                
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al guardar, debe almacenar el producto", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "Activo",
        }

        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
            done()
            },200);             
        })
    })

    test("Al guardar, debe existir al menos un Producto creado", (done) => {
        productosController.cargarTodas(request, response)
            //console.log("---------->")
            //console.log(response.json.mock.calls[0][0])            //para verificar hay datos en la consola y como entrar en el array
            
        setTimeout(() => {
            expect(response.json.mock.calls[0].length).toBe(1)
            done()
        },60);             
    })

    test("Borrado de colección", (done) => {
        
        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            expect(true).toBe(true)
            done()
        })      
    })

})

describe("get: /productos/cargarTodasCliente", () => {
    let request
    let response

    beforeAll((done) => {             
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      
            done()
        }).catch((error) => {
        })
       
    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),                
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al guardar, debe almacenar el producto", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "Activo",
        }

        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
            done()
            },200);             
        })
    })

    test("Debe existir al menos un Producto creado", (done) => {
            productosController.cargarTodasCliente(request, response)
            //console.log("---------->")
            //console.log(response.json.mock.calls[0])            //para verificar hay datos en la consola y como entrar en el array
            
            setTimeout(() => {
                expect(response.json.mock.calls[0].length).toBe(1)
                done()
            },60);             
        })

    test("Borrado de colección", (done) => {
        
        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            expect(true).toBe(true)
            done()
        })      
    })

})

describe("get: /productos/cargarId", () => {
    let request
    let response

    beforeAll((done) => {               //Antes de empezar 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.dbTest).then((respuesta) => {      // Conectarnos a la base de datos
            //console.log("Conexión correcta a MongoDB")
            done()
        }).catch((error) => {
            //console.log(error)
        })
       
    })

    beforeEach(() => {
        request = { body:{}, session:{}, params:{}}
        response = {
            json:jest.fn(),                //fn función
            status:jest.fn().mockReturnThis()
        }
    })

        test("Para ver un producto, el campo Id es obligatorio", (done) => {
        const request = { params: { _id: "" } }

        console.log(request.params._id)
        productosController.cargarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()
    })

    test("Para ver un producto, el campo Id debe ser de 24 caracteres", (done) => {
        const request = { params: { _id: "xxx" } };

        productosController.cargarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo Id debe ser de 24 caracteres"})
        done()
    })

    test("Para ver un producto, debe haber un producto almacenado", (done) => {
        request.body = {
            codigo: "STP001",
            nombre: "Pigmento para tatuar",
            imagen: "img.png",
            cantidad: "20",
            precio: "70000",
            descripcion: "Pigmento de alta calidad",
            estado: "Activo",
        }

        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
            done()
            },200);             
        })
    })
  
    test("Para ver un producto, el campo Id es obligatorio", (done) => {
        productosModel.myModel.find({codigo:"STP001"}).then((respuesta) => {
        request.params._id = respuesta[0]._id.toString()

        productosController.cargarId(request, response)
            
            setTimeout(() => {
                console.log("------+++++")
                console.log(response.json.mock.calls[0][0][0].codigo)
                expect(response.json.mock.calls[0][0][0].codigo).toBe("STP001")
                done()
            },4000);
        })
               
    })

    test("Borrado de colección", (done) => {
        
        productosModel.myModel.deleteMany({}).then((respuesta) => {
            productosController.guardar(request, response)
            expect(true).toBe(true)
            done()
        })      
    })

})

// describe("update: /productos/actualizar", () => {
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

//     test("Al actualizar, debe haber almacenado un producto", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "20",
//             precio: "70000",
//             descripcion: "Pigmento de alta calidad",
//             estado: "Activo",
//         }

//         productosModel.myModel.deleteMany({}).then((respuesta) => {
//             productosController.guardar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
//             done()
//             },200);             //milisegundos
//         })
//     })

//     test("Al actualizar, el campo código es obligatorio", (done) => {
//         request.body = {
//             codigo: "",
//             nombre: "",
//             imagen: "",
//             cantidad: "",
//             precio: "",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo código es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo nombre es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "",
//             imagen: "",
//             cantidad: "",
//             precio: "",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo imagen es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "",
//             cantidad: "",
//             precio: "",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo imagen es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo cantidad es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "",
//             precio: "",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo cantidad es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo precio es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "5",
//             precio: "",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo precio es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo descripcion es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "5",
//             precio: "50000",
//             descripcion: "",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo descripcion es obligatorio"})
//         done()
//     })

//     test("Al actualizar, el campo estado es obligatorio", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "5",
//             precio: "50000",
//             descripcion: "Pigmento de alta calidad",
//             estado: "",
//         }

//         productosController.guardar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo estado es obligatorio"})
//         done()
//     })

// })

// describe("delete: /productos/eliminar", () => {
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

//     test("Al eliminar, el campo Id es obligatorio", (done) => {
//         request.body._id = ""

//         productosController.eliminar(request, response)
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo Id es obligatorio"})
//         done()
//     })

//         test("Al eliminar, debe haber almacenado un producto", (done) => {
//         request.body = {
//             codigo: "STP001",
//             nombre: "Pigmento para tatuar",
//             imagen: "img.png",
//             cantidad: "20",
//             precio: "70000",
//             descripcion: "Pigmento de alta calidad",
//             estado: "Activo",
//         }

//         productosModel.myModel.deleteMany({}).then((respuesta) => {
//             productosController.guardar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto fue almacenado correctamente"})
//             done()
//             },200);             //milisegundos
//         })
//     })

//     test("Al eliminar, debe verificar si el Id existe", (done) => {
//         request.body._id = "68ba2bfc8036444926aa778a"

//         productosController.eliminar(request, response)
//         setTimeout(() => {
//         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El Id que desea eliminar, no existe"})
//         done()
//         },60);
//     })

//     test("Al eliminar, debe eliminar por medio de un Id existente", (done) => {
        
//         productosModel.myModel.find({codigo: "STP001"}).then((respuesta) => {
//             request.body._id = respuesta[0]._id.toString()

//             productosController.eliminar(request, response)
//             setTimeout(() => {
//             expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"El producto se ha eliminado"})
//             done()
//             },60);
//         })      
//     })

//     test("Al eliminar, verificar que no existen productos registrados", (done) => {
//         productosModel.myModel.find({codigo: "STP001"}).then((respuesta) => {

//         productosController.eliminar(request, response)
//         setTimeout(() => {
//         expect(respuesta.length).toBe(0)
//         done()
//         },60);      
//         })
//     })

// })