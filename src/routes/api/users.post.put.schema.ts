import joi from "@hapi/joi";

export const schema = joi.object({
    login: joi.string()
        .alphanum()
        .required(),

    password: joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/)
        .required(),

    age: joi.number()
        .greater(3)
        .less(131)
        .required(),
});
