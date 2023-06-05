const {Videogame, Genre, Platform} = require('../db');

const addVideoGame = async(req, res) => {
   const {name, description, platforms, image, released, rating, genre} = req.body;
   try {
     if(!name || !description || !platforms || !image || !released || !rating || !genre) {
        return res.status(404).json({message: "Datos Incompletos"});
     };
     const video = {name, description, image, released, rating, createdInDb: true};
     let videoCreated = await Videogame.create(video);

     const genreDb = await Genre.findAll({ where: {id: genre}});
     const platformDb = await Platform.findAll({ where: {id: platforms}});
     videoCreated.addGenre(genreDb);
     videoCreated.addPlatform(platformDb);
     res.status(200).json(video); 
   } catch (error) {
     res.status(500).json({message: error.message}); 
   }
};

module.exports = { addVideoGame};