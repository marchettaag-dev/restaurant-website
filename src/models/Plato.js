// Importamos mongoose para poder crear el esquema
const mongoose = require("mongoose");

// Un esquema define la "forma" de los documentos en MongoDB
// Es como decirle: "cada plato SIEMPRE tiene que tener estos campos"
const platoSchema = new mongoose.Schema({
    // Nombre del plato, es obligatorio
    nombre:{
        type: String,
        required: true,
    },

    // Descripción del plato, es obligatorio
    descripcion:{
        type: String,
        required: true,
    },

     // Precio del plato, es obligatorio y tiene que ser un número
    precio:{
        type: Number,
        required: true,
     },

     // Categoría para agrupar platos (ej: "Entradas", "Principales", "Postres")
    categoria:{
        type: String,
        required: true,
    },

    // Si el plato está disponible o no, por defecto siempre está disponible
    disponible:{
        type: Boolean,
        required: true,
        default: true,
    },

    // URL de la imagen del plato
    // No es obligatoria, si no tiene imagen simplemente no se muestra
    imagen: {
        type: String,
        required: false,
        default: null,
    },

    // Si el plato es destacado del dia o no, por defecto no es destacado.
    destacados:{
        type: Boolean,
        required: false,
        default: false,
    },
});

// Creamos el modelo basado en el esquema
// "Plato" es el nombre, mongoose crea la colección "platos" automáticamente
const Plato = mongoose.model("Plato", platoSchema);

// Exportamos el modelo para usarlo en las rutas
module.exports = Plato; 