const express = require("express");
const router = express.Router();

// Importamos jsonwebtoken para generar el token
const jwt = require("jsonwebtoken");

// ─────────────────────────────────────────────
// POST /api/auth/login
// Recibe usuario y contraseña, si son correctos
// devuelve un token JWT para acceder al admin
// ─────────────────────────────────────────────
router.post("/login", (req, res) =>{

    const {usuario, password} = req.body;

    // Temporal para debuggear
    console.log("Recibido:", usuario, password);
    console.log("Esperado:", process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

    // Comparamos con las variables del .env
    // Nunca hardcodeamos credenciales en el código
    const usuarioCorrecto = usuario === process.env.ADMIN_USER;
    const passwordCorrecta = password === process.env.ADMIN_PASSWORD;   

    if(!usuarioCorrecto || !passwordCorrecta){
        // Si algo no coincide devolvemos error 401 (no autorizado)
        return res.status(401).json({  error: "Usuario o contraseña incorrectos"});
    }

    // Si las credenciales son correctas generamos el token
    // jwt.sign(payload, secreto, opciones)
    // payload = datos que queremos guardar en el token (no sensibles)
    // secreto = clave para firmar el token, solo la conoce el servidor
    // expiresIn = cuánto tiempo dura el token antes de vencer
    
    const token = jwt.sign(
        {usuario: process.env.ADMIN_USER},
        process.env.JWT_SECRET,
        {expiresIn: "8h"}
    );

    res.json({token});
});

module.exports = router;
