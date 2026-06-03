// dotenv lee el archivo .env y carga las variables secretas
// como MONGODB_URI y PORT para que las podamos usar con process.env
require("dotenv").config();

// Importamos express para crear el servidor
const express = require("express");

// Importamos la función de conexión a MongoDB que creamos en db.js
const conectarDB = require("./db");

// Importamos las rutas de platos
const platosRoutes = require("./routes/platos");

// Importamos las rutas de autenticación
const authRoutes = require("./routes/auth");

// Creamos la aplicación de express
const app = express();

// Le decimos a express que entienda JSON
// Sin esto, cuando el dueño mande datos para agregar un plato
// el servidor no podría leerlos
app.use(express.json());

// Le decimos a express que todas las rutas que empiecen con
// /api/platos las maneje el archivo routes/platos.js
app.use("/api/platos", platosRoutes);

// Le decimos a Express que sirva los archivos estáticos
// de la carpeta public (HTML, CSS, JS, imágenes)
app.use(express.static("public"));

// Rutas de autenticación (login)
app.use("/api/auth", authRoutes);

// Conectamos a la base de datos antes de arrancar el servidor
conectarDB();

// Definimos el puerto donde va a correr el servidor
// Si existe PORT en el .env usa ese, sino usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Ruta de prueba para verificar que el servidor funciona
// Cuando entrés a http://localhost:3000/ en el navegador vas a ver el mensaje
app.get("/", (req, res) =>{
    res.json({ mensaje: "API del menú del restaurante funcionando ✅" });
});

// Arrancamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () =>{
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

