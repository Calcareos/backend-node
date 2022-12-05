const jwt = require('jsonwebtoken');
var { config } = require('../helpers/config.js');
module.exports = {
    authToken: (req, res, next) => {

        var token = req.headers['authorization']
       
        if (!token) {
            res.status(401).send({
                error: "Es necesario el token de autenticación"
            })
            return
        }
        //token = token.replace('Bearer ', '')
        jwt.verify(token, config.TOKEN_SEED, function (err, user) {
            if (err) {
                res.status(401).send({
                    error: 'Token inválido'
                })
            } else {
                next();
            }
        })
    },
   
};