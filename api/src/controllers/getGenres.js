const {Genre} = require("../db");

require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/genres';
const {API_KEY} =  process.env;

const getGenres = async(req, res) => {
    //inicialmente solicitamos los datos de la Api y los almacenamos en la tabla Genres

    try {
        const generos = await axios.get(`${URL}?key=${API_KEY}`);
        const datos = generos.data.results;
 
        datos.forEach(element => { 
            Genre.findOrCreate({where: {name: element.name}});
        });
        const newGeneros = await Genre.findAll()
        res.status(200).json(newGeneros);
    } catch (error) {
        res.status(500).json({message: error.message});  
    }


};

module.exports = {getGenres};