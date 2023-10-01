const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const Movie = require("../models/movie");
const BadRequestError = require("../errors/BadRequestError");

const getMovies = async (req, res, next) => {
    try {
        const movie = await Movie.find({});
        res.send(movie);
    } catch (err) {
        next(err);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const {
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
            nameRU,
            nameEN,
        } = req.body;

        const movie = await Movie.create({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
            nameRU,
            nameEN,
            owner: req.user._id,
        });

        if (!movie) {
            throw new NotFoundError("Фильм не добавлен");
        }
        res.status(201).send(movie);
    } catch (err) {
        if (err.name === "ValidationError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }
        next(err);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params._id);
        if (!movie) {
            throw new NotFoundError("Фильм не найден");
        }

        if (movie.owner.toString() !== req.user._id) {
            throw new ForbiddenError("У вас нет прав");
        }

        await movie.deleteOne();
        res.send({ message: "Фильм удален" });
    } catch (err) {
        if (err.name === "CastError") {
            next(new BadRequestError("Невалидные данные"));
            return;
        }

        next(err);
    }
};

module.exports = { getMovies, deleteMovie, createMovie };
