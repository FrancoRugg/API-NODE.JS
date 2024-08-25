const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, editProductSchema, deleteProductSchema, getUserProductSchemaById } = require('../schemas/productsSchema');
const conn = new ProductsService(); // Conexión

async function getProducts(req, res, next) {
    try {
        const users = await conn.getProducts(); // Método de la conexión
        res.send(JSON.stringify(users));
    } catch (error) {
        next(error);
    }
    // return res.end(JSON.stringify(users.info));
}
async function getProductById(req, res, next) {
    try {
        // validatorHandler(getUserProductSchemaById, req.params);
        const id = req.params.id; //Para traerme el dato enviado
        const getProductById = await conn.getProductById(id);

        // res.send(getProductById);
        res.send(JSON.stringify(getProductById));
    } catch (error) {
        next(error);
    }
}
async function deleteProduct(req, res, next) {
    try {
        // validatorHandler(deleteProductSchema, req.params);
        const id = req.params.id; //Para traerme el dato enviado
        const deleteProduct = await conn.deleteProduct(id, req.headers.authorization);

        res.send(deleteProduct);
    } catch (error) {
        next(error);
    }
}
async function createProduct(req, res, next) {
    try {
        // validatorHandler(createProductSchema, req.params.body);
        const newProduct = req.body; //Traerme lo que se manda por body
        const createProduct = await conn.createProduct(newProduct, req.headers.authorization);

        res.send(createProduct);
    } catch (error) {
        next(error);
    }

}
async function updateProduct(req, res, next) {
    try {
        // validatorHandler(editProductSchema, req.params.body);
        const newData = req.body; //Traerme lo que se manda por body
        const updateProduct = await conn.updateProduct(newData, req.headers.authorization);

        res.send(updateProduct);
    } catch (error) {
        next(error);
    }

}
module.exports = {
    getProducts, getProductById, createProduct, updateProduct, deleteProduct
}