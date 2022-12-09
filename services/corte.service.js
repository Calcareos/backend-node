const { knexDB } = require('../helpers/db');
const logger = require('../helpers/logger')(__filename);
var moment = require('moment');
const srv = {

    list: async () => {
        try {
            var options = await knexDB.from('ordenCorte').select("*");
            return options;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    readById: async (idOpcion) => {
        try {
            var opcion = await knexDB.from('ordenCorte').select("*").where("id", "=", idOpcion).first();
            return opcion;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

    create: async (opcion) => {
        try {
            var inserted = await knexDB('ordenCorte').insert(opcion).returning('*');
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
            var update = await knexDB('ordenCorte').where({ id: idOpcion }).update(datos).returning('*');
            return update;
        } catch (ex) {
            console.log(ex);
            throw { error: ex, code: 500 };
        }
    },

};

module.exports = srv;