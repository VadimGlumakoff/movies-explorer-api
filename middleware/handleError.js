const handleError = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? "Ошибка сервера" : error.message;
    res.status(statusCode).send({ message });
    next();
};

module.exports = handleError;
