const jwt = require('jsonwebtoken');

// Middleware para checar la autenticidad del token enviado por encabezado Bearer.
module.exports = (req, res, next) => {
    try {
        // Obtención de token por encabezado Bearer.
        let token = req.headers.authorization.split(" ")[1];
        // Decodificar token
        let decoded = jwt.verify(token, process.env.PRIVATE_KEY, { ignoreExpiration: false });

        // Permitir acceso
        req.userData = decoded;
        next();
    }
    catch(error) {
        // Token inválido
        return res.status(401).json({ ok: false, unauth: true, err: error });
    }
};