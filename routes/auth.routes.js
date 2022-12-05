var express = require('express');
var router = express.Router();
const srv = require('../controllers/usuario.controller');

router
    .post('/login', srv.validate('login'), srv.login)

module.exports = router;