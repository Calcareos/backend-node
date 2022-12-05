const { body } = require('express-validator/check')
const logger = require('../helpers/logger')(__filename);
const srvOpcion = require('../services/opcion.service');

const cntrl = {

    validate: (method) => {
        switch (method) {
            case 'create':
                {
                    return [
                        body('codigo', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('ruta', 'Campo Requerido.').exists(),
                        body('menu', 'Campo Requerido.').exists(),
                        body('icon', 'Campo Requerido.').exists(),
                        body('usuario_creacion', 'Campo Requerido').exists(),
                    ]
                }
            case 'update':
                {
                    return [
                        body('id', 'Campo requerido.').exists(),
                        body('codigo', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('ruta', 'Campo Requerido.').exists(),
                        body('menu', 'Campo Requerido.').exists(),
                        body('icon', 'Campo Requerido.').exists(),
                        body('usuario_modificacion', 'Campo Requerido').exists(),
                    ]
                }
        }
    },

    list: async(req, res) => {
        try {
            var options = await srvOpcion.list();
            res.json({ status: true, data: options });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    readById: async(req, res) => {
        try {
            var opcion = await srvOpcion.readById(req.params.id);
            res.json({ status: true, data: opcion });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    create: async(req, res) => {
        try {
            var inserted = await srvOpcion.create(req.body)
            res.json({ status: true, data: inserted });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    update: async(req, res) => {
        try {
            var update = await srvOpcion.update(req.params.id, req.body);
            res.json({ status: true, data: update });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    cambiarEstado: async(req, res) => {
        try {
            var update = await srvOpcion.cambiarEstado(req.params.id, req.body);
            res.json({ status: true, data: update });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    }
};

module.exports = cntrl;