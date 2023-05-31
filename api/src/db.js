require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE} = process.env;
const VideogameModel = require("./models/Videogame.js");
const GenreModel = require("./models/Genre.js");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
  { logging: false, native: false }
);

VideogameModel(sequelize);
GenreModel(sequelize);
const { Videogame, Genre } = sequelize.models;


Videogame.belongsToMany(Genre, {through: 'video_genre'});
Genre.belongsToMany(Videogame, {through: 'video_genre'});

module.exports = {
  Videogame,
  Genre,
  conn: sequelize,     
};
