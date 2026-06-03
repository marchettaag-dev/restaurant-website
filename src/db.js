// Importamos mongoose, que es la librería que nos permite
// conectarnos y hablar con MongoDB de forma sencilla
const mongoose = require("mongoose");

// Creamos una función para conectarnos a la base de datos.
// La hacemos "async" porque conectarse a internet tarda un momento
// y queremos esperar a que termine antes de seguir
const conectarDB = async() =>{
    try{
        // Intentamos conectarnos usando la URL que guardamos en el .env
        // process.env.MONGODB_URI lee esa variable del archivo .env
        await mongoose.connect(process.env.MONGODB_URI);

        // Si llegamos acá es porque la conexión funcionó
        console.log("✅ Conectado a MongoDB correctamente");
    }catch(error){
        // Si algo salió mal (contraseña incorrecta, sin internet, etc)
        // mostramos el error y cerramos el programa
        console.error("❌ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
}

// Exportamos la función para poder usarla desde otros archivos
module.exports = conectarDB;