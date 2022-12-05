var express = require('express');
var router = express.Router();
const cntrl = require('../controllers/usuario.controller');

router
    .post('/', cntrl.validate('create'), cntrl.create)
    .put('/:id', cntrl.validate('update'), cntrl.update)
    .get('/permisos/:idUsuario', cntrl.listPermisos)
    .get('/plantillaPermisos/:idUsuario', cntrl.plantillaPermisos)
    .put('/setPermisos/:idUsuario', cntrl.setPermisos)
    .put('/setPermisosModulos/:idUsuario', cntrl.setPermisosModulos)
    .get('/', cntrl.list)
    .get('/:id', cntrl.readById)
    .delete('/:id', cntrl.delete);

module.exports = router;