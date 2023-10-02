const express = require("express");
const { getUsers, updateUser } = require("../controlers/user");
const { validationUpdateUser } = require("../middleware/validation");

const router = express.Router();

router.get("/users/me", getUsers);
router.patch("/users/me", updateUser, validationUpdateUser);

module.exports = router;
