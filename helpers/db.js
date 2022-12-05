const kf = require('./knexfile')
var node_env = process.env.NODE_ENV || 'development';
var knxConfig = kf[node_env]


var knexDB = require('knex')(knxConfig);
var knexInitial = require('knex')(kf.create);

module.exports = {
    knexInitial, knexDB    
};
