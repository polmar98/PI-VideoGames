require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE} = process.env;
const VideogameModel = require("./models/Videogame.js");
const GenreModel = require("./models/Genre.js");
const PlatformModel = require("./models/Platform.js");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
  { logging: false, native: false }
);

VideogameModel(sequelize);
GenreModel(sequelize);
PlatformModel(sequelize);
const { Videogame, Genre, Platform } = sequelize.models;


Videogame.belongsToMany(Genre, {through: 'video_genre'});
Genre.belongsToMany(Videogame, {through: 'video_genre'});

Videogame.belongsToMany(Platform, {through: 'video_platform'});
Platform.belongsToMany(Videogame, {through: 'video_platform'});

module.exports = {
  Videogame,
  Genre,
  Platform,
  conn: sequelize,     
};
