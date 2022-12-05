const bcrypt = require('bcryptjs');
const moment = require('moment');
var { config } = require('../helpers/config.js');
const { knexDB } = require('../helpers/db');
const jwt = require('jsonwebtoken')

const srv = {

    login: async (userName, password) => {
        try {
            var usuario = await knexDB('usuarios').where('usuario', userName).select('*');
            if (usuario.length == 0) {
                return { token: null, usuario: null, code: 0 };
            } else if (!bcrypt.compareSync(password, usuario[0].password)) {
                return { token: null, usuario: null, code: 0 };
            } else {
                var tokenData = { usuario: userName, password: password };
                var token = jwt.sign(tokenData, config.TOKEN_SEED, { expiresIn: config.TOKEN_TIME });
                usuario = usuario[0];
                var modulos = await srv.listPermisos(usuario.id)
                usuario.permisos = modulos
                delete usuario['password'];
                return { token: token, usuario: usuario };
            }
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        };
    },

    list: async () => {
        try {
            var users = await knexDB.from('usuarios').select(
                'id',
                'nombre',
                'estado',
                'isAdmin',
                'usuario',
                'fecha_creacion',
                'usuario_creacion',
                'fecha_modificacion',
                'usuario_modificacion').where("estado", "=", 1);
            delete users['password']
            return users;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    readById: async (userId) => {
        try {
            var user = await knexDB.from('usuarios').select("*").where("id", "=", userId).first();
            return user;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    create: async (userData) => {
        try {
            userData.password = bcrypt.hashSync(userData.password, 10); //CIFRAMOS EL PASSWORD QUE VIENE 
            var inserted = await knexDB('usuarios').insert(userData).returning('*');
            delete inserted['password'];
            return inserted;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    update: async (idUser, userData) => {
        try {
            delete userData['id'];
            if (userData.password) { userData.password = bcrypt.hashSync(userData.password, 10); } //CIFRAMOS EL PASSWORD QUE VIENE
            userData.fecha_modificacion = moment().format("YYYY-MM-DD HH:mm:ss");
            var update = await knexDB('usuarios').where({ id: idUser }).update(userData).returning('*');
            delete update['password'];
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    delete: async (idUser) => {
        try {
            var update = await knexDB('usuarios').where({ id: idUser }).update({ estado: false })
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    listPermisos: async (idUser) => {
        try {

            var sql = `SELECT 1 AS id, 'Menu' as label, cast(1 as bit) as isTitle, null as link, null as icon, null as [subItems]
                        UNION
                        SELECT
                        ROW_NUMBER() OVER (ORDER BY M.id) + 1 as id,
                            M.nombre as label,
                            null as isTitle,
                            M.link,
                            M.icon,
                            (SELECT O.nombre AS [label], O.ruta as [link] FROM opciones O INNER JOIN opciones_usuarios OP ON OP.idOpcion = O.id 
                                WHERE O.idModulo = m.ID AND OP.idUsuario = ${idUser} AND OP.estado = 1 AND O.estado = 1 for json path) AS [subItems]
                        FROM modulos M 
                        INNER JOIN modulos_usuarios MU ON MU.idModulo = M.id AND MU.estado = 1
                        WHERE MU.idUsuario = ${idUser} AND M.estado = 1`

            var permisos = await knexDB.raw(sql);
            return permisos;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    plantillaPermisos: async (idUser) => {
        try {
            let permisos = new Object();
            permisos.opciones = await knexDB.raw('select distinct o.id, o.nombre, m.nombre nom_modulo, isnull( ou.estado, 0  ) estado from  opciones o   join modulos   m on m.id= o.idModulo  left join opciones_usuarios ou  on o.id= ou.idOpcion  and ou.idUsuario=? and ou.estado= 1', [idUser]);
            permisos.modulos = await knexDB.raw(`	
            SELECT
                M.id,
                M.nombre,
                isnull( MU.estado, 0 ) estado 
            FROM modulos M
                LEFT JOIN modulos_usuarios MU ON MU.idModulo = M.id 
                AND MU.idUsuario = ?
                AND MU.estado = 1 
            WHERE
                M.estado = 1`, [idUser]);
            return permisos;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    setPermisos: async (idUser, usuario_modificacion, opciones) => {
        const trx = await knexDB.transaction();
        try {
            for (var x = 0; x < opciones.length; x++) {
                var opcion = opciones[x];
                if (opcion.editado) { // SI EL MAN NO FUE EDITADO NO HAGO NADA
                    opcion.fecha_modificacion = moment().format("YYYY-MM-DD HH:mm:ss");
                    var idMod = await knexDB.raw(`SELECT M.id from opciones O INNER JOIN modulos M ON M.id = O.idModulo WHERE O.id = ${opcion.id}`)
                    var valMod = await knexDB('modulos_usuarios').where('idUsuario', '=', idUser).andWhere('idModulo', '=', idMod[0].id)
                    if (valMod.length == 0) {
                        await knexDB('modulos_usuarios').insert({ idUsuario: idUser, idModulo: idMod[0].id, estado: true, usuario_creacion: usuario_modificacion });
                    }
                    var update = await knexDB('opciones_usuarios').where({ idUsuario: idUser, idOpcion: opcion.id }).andWhere('id', '>', 0).update({
                        estado: opcion.estado,
                        fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss")
                    }).returning("*");
                    if (update.length == 0) {
                        var opciones_usuarios = new Object();
                        opciones_usuarios.idUsuario = idUser;
                        opciones_usuarios.idOpcion = opcion.id;
                        opciones_usuarios.usuario_creacion = usuario_modificacion;
                        opciones_usuarios.fecha_creacion = moment().format("YYYY-MM-DD HH:mm:ss");
                        await knexDB('opciones_usuarios').insert(opciones_usuarios).returning('id');
                    }
                }
            };
            await trx.commit;
        } catch (ex) {
            trx.rollback;
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    setPermisosModulos: async (idUser, usuario_modificacion, modulos) => {
        try {
            for (var x = 0; x < modulos.length; x++) {
                var modulo = modulos[x];
                if (modulo.editado) {
                    var update = await knexDB('modulos_usuarios').where({ idUsuario: idUser, idModulo: modulo.id }).andWhere('id', '>', 0).update({
                        estado: modulo.estado,
                        fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss")
                    }).returning("*");
                    if (update.length == 0) {
                        var modulos_usuarios = new Object();
                        modulos_usuarios.idUsuario = idUser;
                        modulos_usuarios.idModulo = modulo.id;
                        modulos_usuarios.usuario_creacion = usuario_modificacion;
                        modulos_usuarios.fecha_creacion = moment().format("YYYY-MM-DD HH:mm:ss");
                        await knexDB('modulos_usuarios').insert(modulos_usuarios).returning('id');
                    }
                }
            }
        } catch (ex) {
            trx.rollback;
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    }

};

module.exports = srv;