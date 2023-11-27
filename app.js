require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const corsHandler = require("./middleware/corsHandler");
const limiter = require("./middleware/limiter");
const handleError = require("./middleware/handleError");

const app = express();
const router = require("./routes/index");

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;

mongoose.connect(NODE_ENV === "production" ? DB_URL : "mongodb://localhost:127.0.0.1/bitfilmsdb", {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(corsHandler);
app.use(router);
app.use(handleError);
app.listen(PORT);

app.get("/", (req, res) => {
    res.cookie("name", "value", { secure: true });
    res.send("Hello World!");
});
