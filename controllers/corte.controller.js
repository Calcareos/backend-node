const { body } = require('express-validator/check')
const logger = require('../helpers/logger')(__filename);
const srvCorte = require("../services/corte.service");

const ctrl = {

    validate: (method) => {
        switch (method) {
            case 'create':
                {
                    return [
                        body('codigo', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('usuario_creacion', 'Campo Requerido').exists(),
                        body('icon', 'Campo Requerido').exists(),
                    ]
                }
            case 'update':
                {
                    return [
                        body('codigo', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('usuario_modificacion', 'Campo Requerido').exists(),
                        body('icon', 'Campo Requerido').exists(),
                    ]
                }
        }
    },

    list: async(req, res) => {
        try {
            var cortes = await srvCorte.list();
            res.json({ status: true, data: cortes });
        } catch (error) {
            res.status(500).json({ status: false, data: error });
            logger.error(error.stack);
        }
    },

    readById: async(req, res) => {
        try {
            var corte = await srvCorte.readById(req.params.id);
            res.json({ status: true, data: corte });
        } catch (error) {
            res.status(500).json({ status: false, data: error });
            logger.error(error.stack);
        }
    },

    create: async(req, res) => {
        try {
            var inserted = await srvCorte.create(req.body);
            res.json({ status: true, data: inserted });
        } catch (error) {
            res.status(500).json({ status: false, data: error });
            logger.error(error.stack);
        }
    },

    update: async(req, res) => {
        try {
            var update = await srvCorte.update(req.params.id, req.body);
            res.json({ status: true, data: update });
        } catch (error) {
            res.status(500).json({ status: false, data: error });
            logger.error(error.stack);
        }
    },

    cambiarEstado: async(req, res) => {
        try {
            var update = await srvCorte.cambiarEstado(req.params.id, req.body);
            res.json({ status: true, data: update });
        } catch (error) {
            res.status(500).json({ status: false, data: error });
            logger.error(error.stack);
        }
    }

};

module.exports = ctrl;