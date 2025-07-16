var express = require("express")  // crear el servidor, envocar el paquete de express
global.app = express()  // Crear el aplicativo del servidor
var bodyParser = require("body-parser")  // instalar body parser
app.use(bodyParser.json()) // configurar body parser
app.use(bodyParser.urlencoded({extended:true}))  // Activación de los elementos de body parser
const mongoose = require("mongoose")  //descargar el paquete en una variable
global.config = require("./config.js").config 
global.sha256 = require("sha256")
global.nodemailer = require("nodemailer")
const cors = require("cors")
const { config } = require("./config.js")

app.use((req, res, next) => {                       //RECIBE EXTENSIONES FRONTEND
  const origin = req.headers.origin;

  if (config.listablanca.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Opcional: responder a preflight directamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

require("./rutas.js")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.db).then((respuesta) => {      // Conectarnos a la base de datos
    console.log("Conexión correscta a MongoDB")
}).catch((error) => {
    console.log(error)
})

app.use(cors({                                              //DETERMINA A QUIEN LE RESPONDE
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.listablanca.indexOf(origin) === -1){
            return callback("Error de Cors No hay permisos",false)
        }
        else{
           return callback(null, true) 
        }
    }
}))

// CIFRADO DE CONTRASEÑAS
// contraseña: aa589
// console.log(sha256("aa589"))
// 8bfb8fd22563f82e1f1313a41a98b0144b96ef89755ba56b7dadff88f98a8531 VALOR ENCRIPATDO
// var x = "8bfb8fd22563f82e1f1313a41a98b0144b96ef89755ba56b7dadff88f98a8531"
// var y = ["a","b","c"]
//
// for (let a = 0; a < y.length; a++) {
//     for (let b = 0; b < y.length; b++) {
//         for (let n = 0; n < 1000; n++) {
//             var probar = (y[a]+y[b]+n)
//             if(sha256(probar) == x){
//                 console.log("-------------->")
//                 console.log(sha256(probar))
//                 console.log(probar)
//             }
//         }
//     }   
// }

// MODELO 4
// VISTA 1
// CONTROLADOR 3
// RUTAS 2


app.listen(config.puerto, function(){  //Colocar al servidor a que arranque y escuche
    console.log("Servidor funcionando por el puerto " + config.puerto)
}) 