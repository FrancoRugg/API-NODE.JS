
// Función vieja
// function validatorHandler(Schema, data) {
//     const res = Schema.validate(data);
//     if (res.error) {
//         const err = new Error(res.error.details[0].message);
//         err.status = 400;
//         throw err;
//     }
// }
function validatorHandler(Schema, property) {
    return (req, res, next) => {
        const data = req[property];
        // console.log(req.body)
        const response = Schema.validate(data);
        if (response.error) {
            const err = new Error(response.error.details[0].message);
            err.status = 400;
            throw err;
        }
        next();
    }
}



module.exports = validatorHandler;
