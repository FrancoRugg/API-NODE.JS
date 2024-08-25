const express = require('express');
const productRouter = express.Router(); // Para utilizar express
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
productRouter.use(express.json()); //Para utilizar JSON
const secure = require('../middlewares/secure');
const validatorHandler = require('../middlewares/validatorHandler');
const { getProductSchemaById, deleteProductSchema, createProductSchema, editProductSchema } = require('../schemas/productsSchema');


// app.use('/api/users', productRouter);

productRouter.get('/getProducts', secure.checkLog('headers.authorization'), getProducts);//Accede al método GET

productRouter.get('/getProducts/:id', validatorHandler(getProductSchemaById, 'params.id'), secure.checkLog('headers.authorization'), getProductById);//Accede al método GET

productRouter.post('/deleteProduct/:id', validatorHandler(deleteProductSchema, 'params.id'), secure.checkRole(), deleteProduct);//Accede al método POST

productRouter.post('/newProduct', validatorHandler(createProductSchema, 'body'), secure.checkRole(), createProduct);

productRouter.post('/updateProduct', validatorHandler(editProductSchema, 'body'), secure.checkRole(), updateProduct);

module.exports = productRouter;