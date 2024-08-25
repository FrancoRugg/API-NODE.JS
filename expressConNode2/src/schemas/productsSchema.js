const joi = require('joi');

// id
// price
// name
// description
// category
// active

const id = joi.number().min(1);
const price = joi.number().min(1);
const name = joi.string().alphanum().min(3).max(30);
const description = joi.string().alphanum().min(3);
const category = joi.string().alphanum().min(3);
const active = joi.number().min(0).max(1);

const createProductSchema = joi.object({
    price: price.required(),
    name: name.required(),
    description: description.required(),
    category: category.required(),
    active: active
});

const editProductSchema = joi.object({
    id: id.required(),
    price: price,
    name: name,
    description: description,
    category: category,
    active: active
});

const deleteProductSchema = joi.object({
    id: id.required(),
});

const getProductSchemaById = joi.object({
    id: id.required()
});

module.exports = { createProductSchema, editProductSchema, deleteProductSchema, getProductSchemaById };