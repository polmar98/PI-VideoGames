const {Videogame, Genre} = require('../db');
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} =  process.env;

const mapListGames = (arr) => arr.map((result) => {
   return {
      id: result.id,
      name: result.name,
      description: result.description,
      image: result.image,
      released: result.released,
      rating: result.rating,
      createdInDb: result.createdInDb,
      Genres: result.Genres.map((g)=>g.name),
   }
});


const getVideoGames = async(req, res) => {
   try {
      const listaJuegos = await Videogame.findAll({
         include: {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [],},
         },
      });
      const juegosDb = mapListGames(listaJuegos);

      //ahora traigo los registros de la Api, 2 veces a las paginas 1 y 2
      const juegos1 = await axios.get(`${URL}?page=1&page_size=40&key=${API_KEY}`);
      const juegos2 = await axios.get(`${URL}?page=2&page_size=40&key=${API_KEY}`);
      const juegosApi1 = juegos1.data.results; 
      const juegosApi2 = juegos2.data.results; 
      const juegosApi = juegosApi1.concat(juegosApi2);

      //mapeamos los registros que vienen de la Api
      const gamesApi = await juegosApi.map(element => {
         return {
          id: element.id,
          name: element.name,
          description: element.description,
          image: element.background_image,
          released: element.released,
          rating: element.rating,
          createdInDb: false,
          Genres: element.genres.map(ele => ele.name),
         }
      });

      //concatenamos ambos para generar una sola lista
      const gamesAll = gamesApi.concat(juegosDb);

      res.status(200).json(gamesAll);
   } catch (error) {
      res.status(500).json({message: error.message});
   } 
};

module.exports = { getVideoGames};