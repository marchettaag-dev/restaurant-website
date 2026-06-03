// Importamos express para poder crear las rutas
const express = require("express");

// Un router es como un mini servidor que maneja rutas específicas
const router = express.Router();

// Importamos el modelo Plato para poder hablar con MongoDB
const Plato = require("../models/Plato");

// Importamos el middleware de validación de platos
const validarPlato = require("../middlewares/validarPlato");

// Importamos el middleware de validación de token
const verificarToken = require("../middlewares/verificarToken");

// ─────────────────────────────────────────────
// GET /api/platos
// Trae todos los platos de la base de datos
// La usa el cliente del restaurante para ver el menú
// ─────────────────────────────────────────────
router.get("/", async (req, res) =>{
    try{
        const filtro = {}; // empezamos con un objeto vacío, sin filtros

        // Si llegó categoria en la URL, la agregamos al filtro
        if (req.query.categoria) {
            filtro.categoria = { $eq: req.query.categoria };
        }

        // Si llegó disponible en la URL, la agregamos al filtro
        if (req.query.disponible) {
            // ojo: req.query siempre llega como texto "true" o "false"
            // hay que convertirlo a booleano real
            filtro.disponible = { $eq: req.query.disponible === "true" };
        }

        // Si llegó destacados en la URL, la agregamos al filtro
        if (req.query.destacados) {
            filtro.destacados = { $eq: req.query.destacados === "true" };
        }

        // find() con el filtro trae todos los documentos de la colección segun lo q cumpla el filtro
        const platos = await Plato.find(filtro);
        res.json(platos);
    }catch(error){
        res.status(500).json({  error: "Error al obtener los platos" });
    }
});

// ─────────────────────────────────────────────
// GET /api/platos/categorias
// Trae todas las categorías únicas que existen en la base de datos
// La usa el frontend para armar las secciones del menú dinámicamente
// Sin esta ruta, si agregamos una categoría nueva habría que
// modificar el frontend a mano cada vez
// ─────────────────────────────────────────────
router.get("/categorias", async (req, res) =>{                      // primero las rutas específicas
    try{
        // distinct() trae todos los valores únicos de un campo
        // Es como un SELECT DISTINCT en SQL
        // Si hay 10 platos de "Principales" solo devuelve "Principales" una vez
        const categoria = await Plato.distinct("categoria");
        res.json(categoria);
    }catch(error){
        res.status(500).json({  error: "Error al obtener las categorías"});
    }
});

// ─────────────────────────────────────────────
// GET /api/platos/destacados
// Trae todas los platos destacados que existen en la base de datos
// La usa el frontend para armar las secciones de plato destacado o plato del día
// ─────────────────────────────────────────────
router.get("/destacados", async (req, res) =>{
    try{
        const filtro= {};

        if(req.query.destacados){
            filtro.destacados = { $eq: req.query.destacados === "true" };
        }

        const destacados = await Plato.find(filtro);
        res.json(destacados);
    }catch(error){
        res.status(500).json({  error: "Error al obtener los destacados"});
    }
});

// ─────────────────────────────────────────────
// GET /api/platos/:id
// Trae un solo plato por su ID
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) =>{                             // después las rutas con parámetros
    try{
         // req.params.id es el ID que viene en la URL
         const plato = await Plato.findById(req.params.id);

         // Si no encuentra el plato devolvemos un error 404
         if(!plato){
            return res.status(404).json({   error: "Plato no encontrado"    });
         }

         res.json(plato);
    }catch(error){
        res.status(500).json({  error: "Error al obtener el plato"  });
    }
});

// ─────────────────────────────────────────────
// POST /api/platos
// Crea un plato nuevo en la base de datos
// La usa el dueño del restaurante para agregar platos
// ─────────────────────────────────────────────
router.post("/", verificarToken, validarPlato, async (req, res) =>{
    try{
        // Verificamos si lo que llegó es un array o un objeto solo
        const esArray = Array.isArray(req.body);
        // req.body contiene los datos que mandó el dueño
        // (nombre, descripcion, precio, categoria)

        if(esArray){
            // insertMany guarda varios documentos de una sola vez
            const platos = await Plato.insertMany(req.body);

            res.status(201).json(platos);
        }else{
            // Si es un objeto solo, lo guardamos como antes
            const plato = new Plato(req.body);
            
            // Guardamos el plato en MongoDB
            await plato.save();

            // Devolvemos el plato creado con código 201 (creado correctamente)
            res.status(201).json(plato);
        }
    }catch(error){
        console.error("Error al crear plato:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// ─────────────────────────────────────────────
// PUT /api/platos/:id
// Modifica un plato existente
// La usa el dueño para editar nombre, precio, etc
// ─────────────────────────────────────────────
router.put("/:id", verificarToken, async (req, res) =>{
    try{
        // findByIdAndUpdate busca el plato por ID y lo actualiza
        // { new: true } hace que devuelva el plato ya actualizado
        const plato = await Plato.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if(!plato){
            return res.status(404).json({   error: "Plato no encontrado"    });
        }

        res.json(plato);
    }catch(error){
        res.status(500).json({  error: "Error al actualizar el plato"   });
    }
});

// ─────────────────────────────────────────────
// DELETE /api/platos/:id
// Elimina un plato de la base de datos
// La usa el dueño para sacar platos del menú
// ─────────────────────────────────────────────
router.delete("/:id", verificarToken, async (req, res) =>{
    try{
        const plato = await Plato.findByIdAndDelete(req.params.id);

        if(!plato){
            return res.status(404).json({   error: "Plato no encontrado"    });
        }

        res.json({  mensaje: "Plato eliminado correctamente"})
    }catch(error){
        res.status(500).json({  error: "Error al eliminar el plato" });
    }
});

// Exportamos el router para usarlo en index.js
module.exports = router;