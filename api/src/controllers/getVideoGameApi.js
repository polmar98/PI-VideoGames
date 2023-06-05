const {Videogame, Genre, Platform} = require('../db');
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} =  process.env;
//este controller trae los registros de la API

//esta funcion me devuelve los registros existentes en la BD
const getVideoGameBD = async() => {
  try {
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
     return listaJuegos;
  } catch (error) {
     return [];
  } 
};

const getVideoGameApi = async(req, res) => {
   try {
      //ejecuto 3 solicitudes a la Api para traerme 120 elementos ya que solo me trae max 40 x pagina
      const buscados1 = await axios.get(`${URL}?page=1&page_size=40&key=${API_KEY}`);
      //const buscados2 = await axios.get(`${URL}?page=2&page_size=40&key=${API_KEY}`);
      //const buscados3 = await axios.get(`${URL}?page=3&page_size=40&key=${API_KEY}`);


      //buscados = buscados1.data.results.concat(buscados2.data.results);
      //buscados = buscados.concat(buscados3.data.results);
      const buscados = buscados1.data.results;
      const juegos = await buscados.map(element => {
        return {
         id: element.id,
         name: element.name,
         description: element.description,
         image: element.background_image,
         released: element.released,
         rating: element.rating,
         createdInDb: 'false',
         genres: element.genres.map(element => element),
         platforms: element.platforms,
        }
     })

     //llamo la funcion que me trae los registros de la BD
     const buscadosBd = getVideoGameBD();  
     //concatenamos
     const juegosAll = juegos.concat(buscadosBd);
     res.status(200).json(juegosAll);
   } catch (error) {
     res.status(500).json({message: error.message});
   }
};

module.exports = {getVideoGameApi};