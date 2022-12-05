const { body } = require('express-validator/check')
const logger = require('../helpers/logger')(__filename);
const srvUsuario = require('../services/usuarios.service');

const ctrl = {

    validate: (method) => {
        switch (method) {
            case 'login':
                {
                    return [
                        body('usuario', 'Campo Requerido.').exists(),
                        body('password', 'Campo Requerido').exists()
                    ]
                }
            case 'create':
                {
                    return [
                        body('usuario', 'Campo requerido.').exists(),
                        //body('password', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('apellido', 'Campo Requerido').exists(),
                        body('tipo', 'Campo Requerido.').exists(),
                        body('usuario_creacion', 'Campo Requerido').exists(),
                    ]
                }
            case 'update':
                {
                    return [
                        body('usuario', 'Campo requerido.').exists(),
                        //body('password', 'Campo requerido.').exists(),
                        body('nombre', 'Campo Requerido.').exists(),
                        body('apellido', 'Campo Requerido').exists(),
                        body('tipo', 'Campo Requerido.').exists(),
                        body('usuario_modificacion', 'Campo Requerido').exists(),
                    ]
                }
        }
    },

    login: async(req, res) => {
        try {
            var loginData = await srvUsuario.login(req.body.usuario, req.body.password);            
            res.json(loginData);
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });            
            logger.error(JSON.stringify(ex));
        };
    },

    list: async(req, res) => {
        try {
            var users = await srvUsuario.list();
            res.json({ status: true, data: users });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    readById: async(req, res) => {
        try {
            var user = await srvUsuario.readById(req.params.id);
            res.json({ status: true, data: user });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    create: async(req, res) => {
        try {
            var inserted = await srvUsuario.create(req.body);
            res.json({ status: true, data: inserted });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }

    },

    update: async(req, res) => {
        try {
            var update = await srvUsuario.update(req.params.id, req.body);
            res.json({ status: true, data: update });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    delete: async(req, res) => {
        try {
            var updated = await srvUsuario.delete(req.params.id);
            res.json({ status: true, data: updated });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    listPermisos: async(req, res) => {
        try {
            var permisos = await srvUsuario.listPermisos(req.params.idUsuario);
            res.json({ status: true, data: permisos });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    plantillaPermisos: async(req, res) => {
        try {
            var user = await srvUsuario.readById(req.params.idUsuario);
            var permisos = await srvUsuario.plantillaPermisos(req.params.idUsuario);
            res.json({ status: true, data: { usuario: user, plantillaPermisos: permisos } });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    setPermisos: async(req, res) => {
        try {
            await srvUsuario.setPermisos(req.params.idUsuario, req.body.usuario_modificacion, req.body.opciones);
            res.json({ status: true, data: "Permisos actualizados satisfactoriamente" });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

    setPermisosModulos: async(req, res) => {
        try {
            await srvUsuario.setPermisosModulos(req.params.idUsuario, req.body.usuario_modificacion, req.body.modulos);
            res.json({ status: true, data: "Permisos actualizados satisfactoriamente" });
        } catch (ex) {
            res.status(500).json({ status: false, data: ex });
            logger.error(JSON.stringify(ex));
        }
    },

};

module.exports = ctrl;
