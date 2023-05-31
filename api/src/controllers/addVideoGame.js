const {Videogame} = require('../db');

const addVideoGame = async(req, res) => {
   const {name, description, platforms, image, date, rating} = req.body;
   try {
     if(!name || !description || !platforms || !image || !date || !rating) {
        return res.status(404).json({message: "Datos Incompletos"});
     };
     const video = {name, description, platforms, image, date, rating, createdInDb: true};
     await Videogame.findOrCreate({where: {name}, defaults: video });
     res.status(200).json(video); 
   } catch (error) {
     res.status(500).json({message: error.message}); 
   }
};

module.exports = { addVideoGame};