var { config } = require('./config');
const DBConfig = config.DATABASE;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mssql',
    connection: {
        host: DBConfig.HOST,
        user: DBConfig.USER,
        password: DBConfig.PASS,
        database: DBConfig.DB,
        requestTimeout: 750000,
        connectionTimeout: 5000
    },
    pool: {
        min: 2,
        max: 300,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false // <- default is true, set to false
    }
  },

  test: {
    client: 'mssql',
    connection: {
        host: DBConfig.HOST,
        user: DBConfig.USER,
        password: DBConfig.PASS,
        database: DBConfig.DB,
        requestTimeout: 750000,
        connectionTimeout: 5000
    },
    pool: {
        min: 2,
        max: 300,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false // <- default is true, set to false
    }
  },

  production: {
    client: 'mssql',
    connection: {
        host: DBConfig.HOST,
        user: DBConfig.USER,
        password: DBConfig.PASS,
        database: DBConfig.DB,
        requestTimeout: 750000,
        connectionTimeout: 5000
    },
    pool: {
        min: 2,
        max: 300,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false // <- default is true, set to false
    }
  },

  create: {
    client: 'mssql',
    connection: {
        host: DBConfig.HOST,
        user: DBConfig.USER,
        password: DBConfig.PASS,
        requestTimeout: 750000,
        connectionTimeout: 5000
    },
    pool: {
        min: 2,
        max: 300,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false // <- default is true, set to false
    }
  },

};
