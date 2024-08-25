// npm i jsonwebtoken --save
const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
}

function getToken(auth) {
    if (!auth) {
        const err = new Error('You don´t have a token');
        err.status = 400;
        throw err
    }


    if (auth.indexOf('Bearer ') === -1) {
        const err = new Error('Invalid token');
        err.status = 400;
        throw err
    }

    console.log(auth)
    let token = auth.replace('Bearer ', '');
    return token;
}

function decode(auth) {
    const token = getToken(auth);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
}

module.exports = {
    sign, getToken, decode
}