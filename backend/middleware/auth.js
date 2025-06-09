const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Obtener el token del header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    // Verificar si el token es Bearer
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Formato de token inválido' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded.usuario;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};

const verificarAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ msg: 'No tiene permisos de administrador' });
    }
    next();
};

module.exports = {
    verificarToken: module.exports,
    verificarAdmin
}; 