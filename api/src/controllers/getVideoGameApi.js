const {Videogame, Genre, Platform} = require('../db');
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} =  process.env;


const getVideoGameApi = async(req, res) => {
  try {
     //primero traemos todos los registros de la BD
     const listaJuegos = await Videogame.findAll({
        include: [{
           model: Genre,
           attributes: ['name'],
           through: { attributes: [],},
        },
        {
           model: Platform,
           attributes: ['name'],
           through: { attributes: [],},
        }]
     });
     
     //ahora traemos los registros de la Api
      //ejecuto 3 solicitudes a la Api para traerme 120 elementos ya que solo me trae max 40 x pagina
      const buscados1 = await axios.get(`${URL}?page=1&page_size=40&key=${API_KEY}`);
      //const buscados2 = await axios.get(`${URL}?page=2&page_size=40&key=${API_KEY}`);
      //const buscados3 = await axios.get(`${URL}?page=3&page_size=20&key=${API_KEY}`);

      //let array = buscados1.data.results.concat(buscados2.data.results);
      //let buscados = array.concat(buscados3.data.results);
      const buscados = buscados1.data.results;     
      const juegos = await buscados.map(element => {
         return {
          id: element.id,
          name: element.name,
          description: element.description,
          image: element.background_image,
          released: element.released,
          rating: element.rating,
          createdInDb: false,
          Genres: element.genres.map(ele => ele.name),
          Platforms: element.platforms.map(ele => ele.platform.name),
         }
      });
 
      const juegosAll = juegos.concat(listaJuegos);

      res.status(200).json(juegosAll);

   } catch (error) {
     console.log("Error al ejecutar consulta");
     return [];
  } 
};


module.exports = {getVideoGameApi};