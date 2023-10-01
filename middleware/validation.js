const { celebrate, Joi } = require("celebrate", "Joi");
const validUrl = require("valid-url");

const validationLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationUpdateUser = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().min(2).max(30).required(),

    }),
});

const validationMovieId = celebrate({
    params: Joi.object().keys({
        movieId: Joi.number().required(),
    }),
});

const validationCreateMovie = celebrate({
    body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
        trailerLink: Joi.string().required().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
        thumbnail: Joi.string().required().custom((value, helper) => {
            if (!validUrl.isWebUri(value)) {
                return helper.error("Невалидный url");
            }
            return value;
        }),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
    }),
});

module.exports = {
    validationCreateMovie,
    validationCreateUser,
    validationLogin,
    validationMovieId,
    validationUpdateUser,
    // validationUserId,
};
