const {Videogame, Genre, Platform} = require('../db');
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games/';
const clave = 'ji:]_j=4Qycxi=#';  //con esta clave me registre
const {API_KEY} =  process.env;

const getVideoGameById = async(req, res) => {
   const {id} = req.params;
   const idBusqueda = Number(id);
   console.log(id.length);
   try {
      //validamos si l tipo de datos del parametro Id es numerico o typo UUID

      if(id.length > 12) {
          let result = await Videogame.findOne({
          where: {id},
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

          if(result){  //encontrado en la BD
              const game = {
                 id: result.id,
                 name: result.name,
                 description: result.description,
                 image: result.image,
                 released: result.released,
                 rating: result.rating,
                 createdInDb: result.createdInDb,
                 Genres: result.Genres.map((g)=>g.name),
                 Platforms: result.Platforms.map((p)=>p.name),
              };
              return res.status(200).json(game);
          } else return res.status(404).json({message: "Id No encontrado"});
      }; 

      //buscamos en la API externa.
      buscado = await axios.get(`${URL}${idBusqueda}?key=${API_KEY}`);
   
      if(buscado){  //encontrado en la API EXTERNA
         const element = buscado.data;
         const juego = { 
               id: element.id,
               name: element.name,
               description: element.description,
               image: element.background_image,
               released: element.released,
               rating: element.rating,
               Genres: element.genres.map(ele => ele.name),
               Platforms: element.platforms.map(ele => ele.platform.name),
     
         } 
        return res.status(200).json(juego);
      } else return res.status(404).json({message: "Id No encontrado"})
         

   } catch (error) {
      res.status(500).json({message: error.message});
   } 
   
};

module.exports = { getVideoGameById};