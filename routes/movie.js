const express = require("express");
const { getMovies, deleteMovie, createMovie } = require("../controlers/movie");
const { validationCreateMovie, validationMovieId } = require("../middleware/validation");

const router = express.Router();

router.get("/movies", getMovies);
router.post("/movies", createMovie, validationCreateMovie);

router.delete("/movies/:id", deleteMovie, validationMovieId);

module.exports = router;
