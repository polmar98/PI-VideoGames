const {Videogame} = require("../db");
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} =  process.env;
//este controller trae los registros filtrados por el nombre

const getVideoGameByName = async(req, res) => {
   const {name} = req.query;
   const obj = req.query;
 
   if(obj.hasOwnProperty("name")) {
      //si la propiedad enviada por query es name hacemos la busqueda inicial en la API
      try {
         const buscados = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
         const juegosApi = await buscados.data.results.map(element => {
            return {
               id: element.id,
               name: element.name,
               description: element.description,
               image: element.background_image,
               platforms: element.platforms,
               genres: element.genres.map(element => element),
               released: element.released,
               rating: element.rating,
               createdInDb: 'false'
            }
         })
         
         //ahora buscamos los registros de la base de datos que cumplan la condicion
         const juegos2 = await Videogame.findAll();
         const juegosBD = juegos2.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
         const juegos = juegosApi.concat(juegosBD)

         if(!juegos.length) return res.status(404).json({message: "No hay coincidencias"});

         res.status(200).json(juegos);
      } catch (error) {
         res.status(500).json({message: error.message});
      }     
   } else  res.status(404).json({message: "No se envio criterio de busqueda"});
  
   
};

module.exports = {getVideoGameByName};