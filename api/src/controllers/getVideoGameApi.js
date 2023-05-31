require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const {API_KEY} =  process.env;
//este controller trae los registros de la API

const getVideoGameApi = async(req, res) => {
   try {
      const buscados = await axios.get(`${URL}?key=${API_KEY}`);
      const juegos = await buscados.data.results.map(element => {
        return {
           id: element.id,
           name: element.name,
           description: element.description,
           image: element.background_image,
           platforms: element.platforms.map(element => element),
           date: element.released_at,
           rating: element.rating
        }
     })
   
     res.status(200).json(juegos);
   } catch (error) {
     res.status(500).json({message: error.message});
   }
};

module.exports = {getVideoGameApi};