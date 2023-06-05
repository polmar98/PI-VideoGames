const {Platform} = require("../db");

require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/platforms';
const {API_KEY} =  process.env;

const getPlatforms = async(req, res) => {
    //inicialmente solicitamos los datos de la Api y los almacenamos en la tabla Platform

    try {
        const plataformas = await axios.get(`${URL}?key=${API_KEY}`);
        const datos = plataformas.data.results;
        datos.forEach(element => { 
            Platform.findOrCreate({where: {name: element.name}});
        });
        const newPlataforma = await Platform.findAll()
        res.status(200).json(newPlataforma);
    } catch (error) {
        res.status(500).json({message: error.message});  
    }

 
};

module.exports = {getPlatforms};