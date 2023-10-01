const express = require("express");
const { requestLogger, errorLogger } = require("../middleware/logger");
const { logout } = require("../controlers/user");
const { auth } = require("../middleware/auth");
const { createUser, login } = require("../controlers/user");
const { validationCreateUser, validationLogin } = require("../middleware/validation");

const router = express.Router();
router.use(requestLogger);

const userRouter = require("./user");
const movieRouter = require("./movie");

router.post("/signin", login, validationLogin);
router.post("/signup", createUser, validationCreateUser);
router.get("/signout", logout);
router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use(errorLogger);
module.exports = router;
