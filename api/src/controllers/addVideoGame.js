const {Videogame, Genre, Platform} = require('../db');

const addVideoGame = async(req, res) => {
   const {name, description, platforms, image, released, rating, genres} = req.body;

   try {
     if(!name || !description || !platforms || !image || !released || !rating || !genres) {
        
        return res.status(404).json({message: "Datos Incompletos"});
     };
     const video = {name, description, image, released, rating, createdInDb: true};
     const arrayGenres = genres.map(ele => Number(ele));
     const arrayPlatforms = platforms.map(ele => Number(ele));
     let videoCreated = await Videogame.create(video);

     const genreDb = await Genre.findAll({ where: {id: arrayGenres}});
     const platformDb = await Platform.findAll({ where: {id: arrayPlatforms}});

     videoCreated.addGenre(genreDb);
     videoCreated.addPlatform(platformDb);

     res.status(200).json({message: "VideoGame Created"}); 
   } catch (error) {
     res.status(500).json({message: "Failed to created VideoGame"}); 
   }
};

module.exports = { addVideoGame};