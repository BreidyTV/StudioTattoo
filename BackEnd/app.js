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
const session = require("express-session")
const mongoStore = require("connect-mongo")
global.path = require("path") //Libreria de anexos
global.appRoot = path.resolve(__dirname)
global.multer = require("multer")


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

mongoose.connect("mongodb://127.0.0.1:27017/" + config.db).then((respuesta) => {      // Conectarnos a la base de datos
    console.log("Conexión correcta a MongoDB")
}).catch((error) => {
    console.log(error)
})

app.use(session({
    secret:config.claveSecreta,
    resave:true,                                                  //SE REFRESCA LA SESIÓN
    saveUninitialized:true,
    store:mongoStore.create({
        client:mongoose.connection.getClient(),
        dbName: config.db,
        collectionName:"sesiones",
        ttl:config.expiracion                                                       //TIEMPO DE EXPIRACION
    }),
    cookie:{
        maxAge:config.expiracion,                                                 //TIEMPO DE VIDA DE LA SESIÓN (UNIDAD Mili SEGUNDOS)
        httpOnly:true
    },
    name:"CookieApp",
    rolling:true
}))

require("./rutas.js")

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

// MODELO 4
// VISTA 1
// CONTROLADOR 3
// RUTAS 2

app.use("/assets", express.static(__dirname + '/assets'))                               //EXPOSICIÓN/ECPORTACIÓN DE UNA CARPETA

app.listen(config.puerto, function(){  //Colocar al servidor a que arranque y escuche
    console.log("Servidor funcionando por el puerto " + config.puerto)
}) 