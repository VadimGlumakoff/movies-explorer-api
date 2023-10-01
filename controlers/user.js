const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
    try {
        const owner = req.user._id;
        const users = await User.findOne({ owner });
        res.send(users);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { email, name },
            { new: true, runValidators: true },
        );

        if (!user) {
            throw new AuthError("Профиль не обновлен");
        }

        res.send(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashPassword, name });
        res.status(201).send({
            email, name: user.name,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            next(new BadRequestError("Невалидные данные"));
        } else

        if (err.code === 11000) {
            next(new ConflictError("Пользователь с таким email уже существует"));
        }
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new NotFoundError("Пользователь не найден");
        }
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AuthError("Введен неверный пароль");
        }
        const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "secretkey",
            { expiresIn: "7d" },
        );

        const cookieOption = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        };
        res.cookie("jwtToken", token, cookieOption);
        res.send({ message: "Успешно вошли" });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwtToken").send({ message: "Успешно вышли" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers, updateUser, createUser, login, logout,
};
