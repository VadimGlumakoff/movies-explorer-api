const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const handleError = require("./middleware/handleError");

const app = express();
const router = require("./routes/index");

const { PORT = 3000, DB_URL = "mongodb://localhost:27017/bitfilmsdb" } = process.env;

mongoose.connect(DB_URL, {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleError);
app.listen(PORT);
