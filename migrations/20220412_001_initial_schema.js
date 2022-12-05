const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`CREATE TABLE [dbo].[usuarios] (
      [id] int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
      [usuario] varchar(15) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
      [password] varchar(max) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
      [nombre] varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
      [saldo] int DEFAULT 0 NULL,
      [usuario_creacion] varchar(15) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
      [fecha_creacion] datetime DEFAULT getdate() NULL,
      [usuario_modificacion] int  NULL,
      [fecha_modificacion] datetime  NULL,
      [estado] bit  NULL,
      [isAdmin] bit DEFAULT 0 NULL,
    )`).then(function () {
    console.log('Tabla usuarios creada correctamente!');
  });

  await knex.raw(`CREATE TABLE [dbo].[opciones] (
      [id] int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
      [idModulo] int  NOT NULL,
      [codigo] varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
      [nombre] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
      [ruta] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
      [menu] bit DEFAULT 0 NOT NULL,
      [icon] varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
      [usuario_creacion] int  NULL,
      [fecha_creacion] datetime DEFAULT getdate() NOT NULL,
      [usuario_modificacion] int  NULL,
      [fecha_modificacion] datetime  NULL,
      [estado] bit DEFAULT 1 NOT NULL
    )`).then(function () {
    console.log('Tabla opciones creada correctamente!');
  });

  await knex.raw(`CREATE TABLE [dbo].[modulos] (
    [id] int  IDENTITY(1,1) NOT NULL,
    [codigo] varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
    [nombre] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
    [icon] varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
    [usuario_creacion] int  NOT NULL,
    [fecha_creacion] datetime DEFAULT getdate() NOT NULL,
    [usuario_modificacion] int  NULL,
    [fecha_modificacion] datetime  NULL,
    [estado] bit DEFAULT 1 NOT NULL,
    [link] varchar(20) COLLATE Modern_Spanish_CI_AS  NULL
  )`).then(function () {
    console.log('Tabla modulos creada correctamente!');
  });

  await knex.raw(`CREATE TABLE [dbo].[opciones_usuarios] (
      [id] int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
      [idUsuario] int  NOT NULL,
      [idOpcion] int  NOT NULL,
      [usuario_creacion] int  NOT NULL,
      [fecha_creacion] datetime  NOT NULL,
      [usuario_modificacion] int  NULL,
      [fecha_modificacion] datetime  NULL,
      [estado] bit DEFAULT 1 NOT NULL
    )`).then(function () {
    console.log('Tabla opciones_usuarios creada correctamente!');
  });

  await knex.raw(`CREATE TABLE [dbo].[modulos_usuarios] (
      [id] int  IDENTITY(1,1) NOT NULL,
      [idUsuario] int  NOT NULL,
      [idModulo] int  NOT NULL,
      [usuario_creacion] int  NOT NULL,
      [fecha_creacion] datetime DEFAULT getdate() NOT NULL,
      [usuario_modificacion] int  NULL,
      [fecha_modificacion] datetime  NULL,
      [estado] bit DEFAULT 1 NOT NULL )`).then(function () {
    console.log('Tabla modulos_usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[modulos_usuarios] ([idUsuario], [idModulo], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'1', N'1', N'1', N'2022-04-22 10:59:48.583', NULL, NULL, N'1')`).then(function () {
    console.log('Relación modulos usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[modulos_usuarios] ([idUsuario], [idModulo], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'1', N'2', N'1', N'2022-04-22 11:57:24.577', NULL, NULL, N'1')`).then(function () {
    console.log('Relación opciones usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[modulos] ([codigo], [nombre], [icon], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado], [link]) VALUES (N'DAS', N'Dashboard', N'home', N'1', N'2022-04-22 15:40:35.770', NULL, NULL, N'1', N'/dashboard')`).then(function () {
    console.log('Módulo Dashboard en tabla módulos creado correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[modulos] ([codigo], [nombre], [icon], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado], [link]) VALUES (N'ADM', N'Administración general', N'settings', N'1', N'2022-04-22 15:41:04.960', NULL, NULL, N'1', NULL)`).then(function () {
    console.log('Módulo Administración general en tabla módulos creado correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones] ([idModulo], [codigo], [nombre], [ruta], [menu], [icon], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'2', N'MOD', N'Módulos', N'/maestros/modulos', N'0', N'none', N'1', N'2022-04-22 10:03:47.363', N'1', N'2022-04-22 11:54:47.000', N'1')`).then(function () {
    console.log('Opción Módulos creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones] ([idModulo], [codigo], [nombre], [ruta], [menu], [icon], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'2', N'OPC', N'Opciones', N'/maestros/opciones', N'0', N'none', N'1', N'2022-04-22 11:54:40.147', NULL, NULL, N'1')`).then(function () {
    console.log('Opción Opciones creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones] ([idModulo], [codigo], [nombre], [ruta], [menu], [icon], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'2', N'USR', N'Usuarios', N'/maestros/usuarios', N'0', N'none', N'1', N'2022-04-22 11:55:22.627', NULL, NULL, N'1')`).then(function () {
    console.log('Opción Usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones_usuarios] ([idUsuario], [idOpcion], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'1', N'1', N'1', N'2022-04-22 10:59:48.583', NULL, NULL, N'1')`).then(function () {
    console.log('Relación opciones_usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones_usuarios] ([idUsuario], [idOpcion], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'1', N'2', N'1', N'2022-04-22 11:57:24.577', NULL, NULL, N'1')`).then(function () {
    console.log('Relación opciones_usuarios creada correctamente!');
  });

  await knex.raw(`INSERT INTO [dbo].[opciones_usuarios] ([idUsuario], [idOpcion], [usuario_creacion], [fecha_creacion], [usuario_modificacion], [fecha_modificacion], [estado]) VALUES (N'1', N'3', N'1', N'2022-04-22 11:57:32.570', NULL, NULL, N'1')`).then(function () {
    console.log('Relación opciones_usuarios creada correctamente!');
  });

  await knex('usuarios').insert([{ usuario: "Admin", nombre: "Administrador", password: bcrypt.hashSync('1234', 10), estado: true, isAdmin : true}]).then(function () {
    console.log('Usuario creado correctamente!');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE [bdo].[usuarios]`)
  await knex.raw(`DROP TABLE [bdo].[opciones]`)
  await knex.raw(`DROP TABLE [bdo].[modulos]`)
  await knex.raw(`DROP TABLE [bdo].[opciones_usuarios]`)
  await knex.raw(`DROP TABLE [bdo].[modulos_usuarios]`)
};
