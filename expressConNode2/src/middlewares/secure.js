const jwt = require('../utils/jwt');

function checkRole() {
    return (req, res, next) => {
        const data = jwt.decode(req.headers.authorization || ''); //Busca en la autorización del postman
        //req.body.id = data ? data.id : null;
        if (data && data.rol === 'ADMIN') {
            next();
        } else {
            const err = new Error('You don´t have rol for that.');
            err.status = 400;
            throw err
        }

    }
}
function checkLog() {
    return (req, res, next) => {
        const data = jwt.decode(req.headers.authorization || ''); //Busca en la autorización del postman
        //req.body.id = data ? data.id : null;
        if (data && data.rol) {
            next();
        } else {
            const err = new Error('You don´t have rol for that.');
            err.status = 400;
            throw err
        }

    }
}
function create_by(auth) {
    const data = jwt.decode(auth || ''); //Busca en la autorización del postman
    const user = data.user;
    return user;
}
// function create_by() {
//     return (req, res, next) => {
//         const data = jwt.decode(req.headers.authorization || ''); //Busca en la autorización del postman
//         const user = data.user;
//         return user;
//     }
// }


module.exports = {
    checkRole,
    create_by,
    checkLog
};