const express = require('express');
const categoryRouter = express.Router(); // Para utilizar express
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
categoryRouter.use(express.json()); //Para utilizar JSON
const secure = require('../middlewares/secure');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCategorySchema, deleteCategorySchemaById, getCategorySchemaById, editCategorySchema } = require('../schemas/categoriesSchema');

// app.use('/api/users', categoryRouter);

categoryRouter.get('/getCategory', secure.checkLog('headers.authorization'), getCategories);//Accede al método GET

categoryRouter.get('/getCategory/:id', validatorHandler(getCategorySchemaById, 'params.id'), secure.checkLog('headers.authorization'), getCategoryById);//Accede al método GET

categoryRouter.post('/deleteCategory/:id', validatorHandler(deleteCategorySchemaById, 'params.id'), secure.checkRole(), deleteCategory);//Accede al método POST

categoryRouter.post('/newCategory', validatorHandler(createCategorySchema, 'body'), secure.checkRole(), createCategory);

categoryRouter.post('/updateCategory', validatorHandler(editCategorySchema, 'body'), secure.checkRole(), updateCategory);

module.exports = categoryRouter;