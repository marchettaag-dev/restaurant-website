// Un middleware es una función que se ejecuta ENTRE que llega el request
// y antes de que llegue a la ruta. Es como un filtro o control de calidad.
// Si los datos están bien, deja pasar. Si no, devuelve un error.

const validarPlato = (req, res, next) =>{
    // Si es un array saltamos la validación individual
    // cada objeto del array lo valida mongoose con el schema
    if(Array.isArray(req.body)) return next();
    
    const { nombre, descripcion, precio, categoria } = req.body;
    const errores= [];

    // Validamos que el nombre exista y no esté vacío
    if(!nombre || nombre.trim() === ""){
        errores.push("El nombre es obligatorio");
    }

    // Validamos que la descripcion exista y no esté vacía
    if(!descripcion || descripcion.trim === ""){
        errores.push("La descripción es obligatoria");
    }

    // Validamos que el precio exista, sea un número y sea positivo
    if(precio === undefined || precio === null){
        errores.push("El precio es obligatorio");
    } else if(typeof precio !== "number"){
        errores.push("El precio tiene que ser un número");
    } else if(precio <= 0){
        errores.push("El precio tiene que ser mayor a 0");
    } 

    // Validamos que la categoria exista y no esté vacía
    if(!categoria || categoria.trim === ""){
        errores.push("La categoría es obligatoria");
    }

    // Si hay errores los devolvemos todos juntos con un 400
    // El dueño sabe exactamente qué corregir
    if(errores.length > 0){
        return res.status(400).json({errores});
    }

    // Si todo está bien, next() le dice a Express que siga
    // y pase a ejecutar la ruta correspondiente
    next();
}

module.exports = validarPlato;