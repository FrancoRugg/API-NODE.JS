const express = require('express');
const UsersService = require('../services/usersService');
// const validatorHandler = require('../middlewares/validatorHandler');
// const { createUserSchema, getUserSchemaById, loginSchema } = require('../schemas/usersSchema');
const conn = new UsersService(); // Conexión



async function getUsers(req, res, next) {
    try {
        const users = await conn.getUsers(); // Método de la conexión
        res.send(JSON.stringify(users));
    } catch (error) {
        next(error);
    }
    // return res.end(JSON.stringify(users.info));
}
async function getUserById(req, res, next) {
    try {
        // validatorHandler(getUserSchemaById, req.params);
        const id = req.params.id; //Para traerme el dato enviado
        const userById = await conn.userById(id);

        // res.send(userById);
        res.send(JSON.stringify(userById));
    } catch (error) {
        next(error);
    }
}
async function createUser(req, res, next) {
    try {
        // validatorHandler(createUserSchema, req.body);
        const newUser = req.body; //Traerme lo que se manda por body
        const createUser = await conn.createUser(newUser, req.headers.authorization);

        res.send(createUser);
    } catch (error) {
        next(error);
    }

}
async function login(req, res, next) {
    try {
        // validatorHandler(loginSchema, req.body);
        const auth = await conn.login(req.body);

        res.send(JSON.stringify(auth));
    } catch (err) {
        next(err);
    }
}

async function del(req, res, next) {
    try {
        const auth = await conn.login(req.body);

        res.send(JSON.stringify(auth));
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getUsers, getUserById, createUser, login
}