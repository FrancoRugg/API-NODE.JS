const joi = require('joi');

const id = joi.number().min(1);
const user = joi.string().alphanum().min(3).max(30);
const password = joi.string().alphanum().min(3).max(15);
const active = joi.number().min(0).max(1);
const rol = joi.string().alphanum().min(3).max(15);

const createUserSchema = joi.object({
    user: user.required(),
    password: password.required(),
    active: active,
    rol: rol

});
// const createUserSchema = joi.object({
//     id: id.required(),
//     name: name.required(),
//     surname: surname.required(),
//     years: years.required(),
//     pass: pass.required()
// });
const editUserSchema = joi.object({
    id: id.required(),
    user: user,
    password: password,
    active: active
});

const getUserSchemaById = joi.object({
    id: id.required()
});

const loginSchema = joi.object({
    user: user.required(),
    password: password.required(),
    active: active
});

module.exports = { createUserSchema, editUserSchema, getUserSchemaById, loginSchema };