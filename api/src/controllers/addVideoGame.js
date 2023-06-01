const {Videogame, Genre} = require('../db');

const addVideoGame = async(req, res) => {
   const {name, description, platforms, image, date, rating, genre} = req.body;
   try {
     if(!name || !description || !platforms || !image || !date || !rating || !genre) {
        return res.status(404).json({message: "Datos Incompletos"});
     };
     const video = {name, description, platforms, image, date, rating, createdInDb: true};
     let videoCreated = await Videogame.create(video);

     const genreDb = await Genre.findAll({ where: {id: genre}});
     videoCreated.addGenre(genreDb);
     res.status(200).json(video); 
   } catch (error) {
     res.status(500).json({message: error.message}); 
   }
};

module.exports = { addVideoGame};