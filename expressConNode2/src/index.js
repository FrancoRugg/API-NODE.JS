// npm i dotenv --save
// import 'dotenv/config'
require('dotenv').config({ path: '../.env' });
const express = require('express');
const indexRouter = require('./routes/index.router');
const { errorHandler, errorLog } = require('./middlewares/errorHandler');
const app = express();

app.use('/', indexRouter);


app.get('/', (req, res) => {
    res.send('I´m a server with Node.js and Express.js');
});//Accede al método GET

app.use(errorLog);
app.use(errorHandler);

//console.log(process.env)
console.log(process.env.PORT)
const port = process.env.PORT || 3000; //Para que te tome el puerto existente o te asigne el 3000
// const port = 3000; //Para que te tome el puerto existente o te asigne el 3000
app.listen(port, () => {
    console.log('Server listening in port: ' + port);
});

