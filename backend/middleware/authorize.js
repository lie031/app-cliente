// Este middleware recibe un array de roles permitidos para una ruta específica
module.exports = function(roles) {
    return (req, res, next) => {
        // Verificar si req.user existe (lo adjunta el middleware 'auth') y si tiene un rol
        if (!req.user || !req.user.role) {
            return res.status(403).json({ msg: 'Autorización denegada: No se encontró el rol del usuario' });
        }

        // Verificar si el rol del usuario autenticado está incluido en los roles permitidos
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: `Acceso denegado. Rol ${req.user.role} no autorizado para esta acción.` });
        }
        next(); // El usuario tiene el rol permitido, continuar con la siguiente función
    };
};