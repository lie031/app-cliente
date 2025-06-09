const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Obtener el token de la cabecera de la petición 'x-auth-token'
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    // Verificar el token
    try {
        // Verifica el token usando el secreto JWT y decodifica el payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adjuntar el payload del usuario (id y role) al objeto de solicitud (req)
        req.user = decoded.user;
        next(); // Continuar con la siguiente función de middleware/ruta
    } catch (err) {
        // Si el token no es válido (ej. expirado, incorrecto)
        res.status(401).json({ msg: 'El token no es válido' });
    }
};