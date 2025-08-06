var multer = require("multer")

var anexosController = {}


anexosController.anexosProductos = function(request, response){

    var nombre = request.params.nombre

    console.log(request.body)

    var upload = multer({
        storage: multer.diskStorage({
            destination:(req, file, cb) => {        //req:request    cb:CallBack
                cb(null,appRoot + '/assets/')      //ruta destino
            }, 
            filename:(req, file, cb) => {
                cb(null,nombre + '.png')
            }
        }), 
        fileFilter:(req, file,cb) => {                            //filtrar por tipo de archivos
            var ext = path.extname(file.originalname)            //Extraer la estención del archivo
            var extensiones = ['.png', '.jpg', 'tif', '.jpeg', 'jfif'] //con inderxOf si no esta en la lista devuelve -1

            if(extensiones.indexOf(ext) == -1){
                cb('Solo aceptamos formatos de imagen' + '[' + extensiones.joint("],[") + ']', null)
            }
            //if(ext != '.png' && ext != '.jng' && ext != '.tif' && ext != '.jpeg' && ext != '.jfif'){
            //    cb('Solo aceptamos formatos de imagen', null)
            //}
            else {
                cb(null, true)
            }
        }
    }).single("file")

    upload(request, response, function(err){        //Subida de los datos
        if(err){
            console.log(err)
            response.json({state:false, error:err})
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado"})
        }
    })

}

module.exports.anexosController = anexosController