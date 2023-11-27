// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
    "http://localhost:3000",
    "http://localhost:3001",
    "glumakoffdiplomfront.nomoredomainsmonster.ru",
    "https://glumakoffdiplomfront.nomoredomainsmonster.ru",
    "http://glumakoffdiplomfront.nomoredomainsmonster.ru",
];

const corsHandler = (req, res, next) => {
    const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
    // проверяем, что источник запроса есть среди разрешённых

    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

    const requestHeaders = req.headers["access-control-request-headers"];
    res.header("Access-Control-Allow-Credentials", true);
    if (allowedCors.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
        res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
        // разрешаем кросс-доменные запросы с этими заголовками
        res.header("Access-Control-Allow-Headers", requestHeaders);
        // завершаем обработку запроса и возвращаем результат клиенту
        return res.end();
    }

    return next();
};

module.exports = corsHandler;
