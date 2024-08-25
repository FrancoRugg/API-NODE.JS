const express = require('express');
const userRouter = require('./user.router');
const productRouter = require('./product.router');
const categoryRouter = require('./category.router');
const indexRouter = express();

indexRouter.use('/api/', userRouter);
indexRouter.use('/api/products', productRouter);
indexRouter.use('/api/categories', categoryRouter);

module.exports = indexRouter;

