const { knexDB } = require('../helpers/db');
const logger = require('../helpers/logger')(__filename);
var moment = require('moment');
const srv = {

    list: async () => {
        try {
            var options = await knexDB.from('opciones').select("*").orderBy("nombre");
            return options;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    readById: async (idOpcion) => {
        try {
            var opcion = await knexDB.from('opciones').select("*").where("id", "=", idOpcion).first();
            return opcion;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    create: async (opcion) => {
        try {
            var inserted = await knexDB('opciones').insert(opcion).returning('*');
            return inserted;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    update: async (idOpcion, datos) => {
        try {
            delete datos['id']
            datos.fecha_modificacion = moment().format("YYYY-MM-DD HH:mm:ss");
            var update = await knexDB('opciones').where({ id: idOpcion }).update(datos).returning('*');
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    cambiarEstado: async (idOpcion) => {
        // const trx = await knexDB.transaction();
        try {
            var opcion = await knexDB.from('opciones').select("*").where("id", "=", idOpcion).first();
            var update = await knexDB('opciones').where({ id: idOpcion }).update({ estado: !opcion.estado, fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss") }).returning('*');
            var modulo = await knexDB.from('modulos').select("*").where("id", "=", opcion.idModulo).first();
            var estadoOp = update[0].estado;
            if (modulo.estado == false && estadoOp == true) {
                await knexDB('modulos').where({ id: opcion.idModulo }).update({ estado: estadoOp, fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss") });
            }
            var validarOpcMod = await knexDB.raw(`SELECT * FROM modulos M INNER JOIN opciones O ON O.idModulo = M.id AND O.estado = 1 WHERE M.id = ${opcion.idModulo}`);
            if (validarOpcMod == undefined || validarOpcMod == null || validarOpcMod.length == 0) {
                await knexDB('modulos').where({ id: opcion.idModulo }).update({ estado: false, fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss") });
            }
            // await trx.commit;

            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    }
};

module.exports = srv;