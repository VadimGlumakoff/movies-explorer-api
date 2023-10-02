const jwt = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            throw new AuthError("Пользователь не авторизован");
        }

        req.user = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "secretkey");
        next();
    } catch (err) {
        next(new AuthError("Пользователь не авторизован"));
    }
};

module.exports = { auth };
