const express = require('express');
const CategoryService = require('../services/categoriesService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCategorySchema, editCategorySchema, getCategorySchemaById, deleteCategorySchemaById } = require('../schemas/categoriesSchema');
const conn = new CategoryService(); // Conexión

async function getCategories(req, res, next) {
    try {
        const categories = await conn.getCategories(); // Método de la conexión
        res.send(JSON.stringify(categories));
    } catch (error) {
        next(error);
    }
    // return res.end(JSON.stringify(users.info));
}
async function getCategoryById(req, res, next) {
    try {
        // validatorHandler(getCategorySchemaById, req.params);
        const id = req.params.id; //Para traerme el dato enviado
        const getCategoryById = await conn.getCategoryById(id);

        res.send(getCategoryById);
    } catch (error) {
        next(error);
    }
}
async function deleteCategory(req, res, next) {
    try {
        // validatorHandler(deleteCategorySchemaById, req.params);
        const id = req.params.id; //Para traerme el dato enviado
        const deleteCategory = await conn.deleteCategory(id, req.headers.authorization);

        res.send(deleteCategory);
    } catch (error) {
        next(error);
    }
}
async function createCategory(req, res, next) {
    try {
        // validatorHandler(createCategorySchema, req.params.body);
        const newCategory = req.body; //Traerme lo que se manda por body
        const createCategory = await conn.createCategory(newCategory, req.headers.authorization);

        res.send(createCategory);
    } catch (error) {
        next(error);
    }

}
async function updateCategory(req, res, next) {
    try {
        // validatorHandler(editCategorySchema, req.params.body);
        const newData = req.body; //Traerme lo que se manda por body
        const updateCategory = await conn.updateCategory(newData, req.headers.authorization);

        res.send(updateCategory);
    } catch (error) {
        next(error);
    }

}
module.exports = {
    getCategories, getCategoryById, createCategory, updateCategory, deleteCategory
}