var { config } = require('./config.js');
const { knexInitial, knexDB } = require('./db');



const srv = {
    createDatabase: async () => {
        try {
            await knexInitial.raw(`CREATE DATABASE ${config.DATABASE.DB}`).then(function () {
                knexInitial.destroy();
                console.log(`Base de datos ${config.DATABASE.DB} creada!`);
            });
            await knexDB.migrate.latest()


        } catch (error) {
        }
    }
}


module.exports = srv