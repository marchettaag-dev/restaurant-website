const jwt = require("jsonwebtoken");

// ─────────────────────────────────────────────
// Middleware que verifica el token JWT
// Se ejecuta antes de cualquier ruta protegida
// Si el token es válido deja pasar, si no rechaza
// ─────────────────────────────────────────────

const verificarToken = (req, res, next) =>{

    // El token llega en el header "Authorization" con el formato:
    // "Bearer eyJhbGciOiJIUzI1NiJ9..."
    // Necesitamos sacar solo la parte del token, sin el "Bearer "
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Si no llegó ningún token rechazamos con 401
    if(!token){
        return res.status(401).json({   error: "Acesso denegado, token requerido"});
    }

    try {
        // jwt.verify comprueba que el token sea válido y no haya vencido
        // Si es válido devuelve el payload que guardamos al crearlo
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos el payload en req.usuario para usarlo en las rutas si lo necesitamos
        req.usuario = payload;

        // Token válido, dejamos pasar al siguiente middleware o ruta
        next();
    } catch (error) {
        // Si el token es inválido o venció rechazamos con 403
        return res.status(403).json({ error: "Token inválido o vencido" });
    }
};

module.exports = verificarToken;