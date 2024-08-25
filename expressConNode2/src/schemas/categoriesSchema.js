const joi = require('joi');

// id
// description
// productId
// active

const id = joi.number().min(1);
const description = joi.string().alphanum().min(3);
const productId = joi.number().min(0);
const active = joi.number().min(0).max(1);

const createCategorySchema = joi.object({
    description: description.required(),
    active: active
});

const editCategorySchema = joi.object({
    id: id.required(),
    description: description,
    active: active
});

const getCategorySchemaById = joi.object({
    id: id.required()
});

const deleteCategorySchemaById = joi.object({
    id: id.required()
});

module.exports = { createCategorySchema, editCategorySchema, getCategorySchemaById, deleteCategorySchemaById };