var express = require('express');
var router = express.Router();
const srv = require('../controllers/opcion.controller');

router
    .post('/', srv.validate('create'), srv.create)
    .put('/:id', srv.validate('update'), srv.update)
    .delete('/:id', srv.cambiarEstado)
    .get('/', srv.list)
    .get('/:id', srv.readById);
module.exports = router;