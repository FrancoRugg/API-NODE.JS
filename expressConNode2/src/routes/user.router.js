const express = require('express');
const userRouter = express.Router(); // Para utilizar express
const { getUsers, getUserById, createUser, login } = require('../controllers/usersController');
userRouter.use(express.json()); //Para utilizar JSON
const secure = require('../middlewares/secure');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, loginSchema, getUserSchemaById } = require('../schemas/usersSchema');

// app.use('/api/users', userRouter);

userRouter.get('/', getUsers);//Accede al método GET

userRouter.get('/users/:id', validatorHandler(getUserSchemaById, 'params.id'), getUserById);//Accede al método GET

userRouter.post('/users/newUser', validatorHandler(createUserSchema, 'body'), secure.checkRole(), createUser);

userRouter.post('/auth/login', validatorHandler(loginSchema, 'body'), login);

module.exports = userRouter;