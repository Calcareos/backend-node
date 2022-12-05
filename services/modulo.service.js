const { knexDB } = require('../helpers/db');
const logger = require('../helpers/logger')(__filename);
var moment = require('moment');
const srv = {

    list: async() => {
        try {
            var modulos = await knexDB.from('modulos').select("*").orderBy("nombre");
            return modulos;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    readById: async(idModulo) => {
        try {
            var modulo = await knexDB.from('modulos').select("*").where("id", "=", idModulo).first();
            return modulo;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    create: async(modulo) => {
        try {
            var inserted = await knexDB('modulos').insert(modulo).returning('*');
            return inserted;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    update: async(idModulo, datos) => {
        try {
            delete datos['id']
            datos.fecha_modificacion = moment().format("YYYY-MM-DD HH:mm:ss");
            var update = await knexDB('modulos').where({ id: idModulo }).update(datos).returning('*');
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    cambiarEstado: async(idModulo) => {
        try {
            var modulo = await knexDB.from('modulos').select("*").where("id", "=", idModulo).first();
            var update = await knexDB('modulos').where({ id: idModulo }).update({ estado: !modulo.estado, fecha_modificacion: moment().format("YYYY-MM-DD HH:mm:ss") }).returning('*');
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    }
};

module.exports = srv;