#!/usr/bin/env node

const express = require('express');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require("cors");
var path = require('path')
var fs = require('fs')
var { config } = require('./helpers/config.js');
const port = config.PORT;
const mgrt = require('./helpers/migration-exe');
const { authToken } = require('./middlewares/auth');



// INICIAMOS EXPRESS
const app = express();
app.use(cors());
//app.use(expressValidator());
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));

// INICIAMOS SERVIDOR HTTP
var http = require('http').createServer(app);

// LOG DE ACCESO A ENDPOINTS 
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
// SE CREA LA BASE DE DATOS INICIAL
mgrt.createDatabase();
// COLOCAMOS EL SERVIDOR A ESCUCHAR
http.listen(port, function () { console.log('Aplicación sirviendo en el puerto N° :' + port); });
http.setTimeout(60000000);


// ROUTES
app.use("/api/auth", require('./routes/auth.routes'));
// app.use([authToken]);
app.use("/api/usuario", require('./routes/usuario.routes'));
app.use("/api/modulo", require('./routes/modulo.routes'));
app.use("/api/opcion", require('./routes/opcion.routes'));
