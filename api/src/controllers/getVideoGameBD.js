const {Videogame, Genre} = require('../db');
//Este controller trae todos los registros de la base de datos. tabla: Videogame

const getVideoGameBD = async(req, res) => {
   try {
      const listaJuegos = await Videogame.findAll({
         include: {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [],},
         }
      });
      res.status(200).json(listaJuegos);
   } catch (error) {
      res.status(500).json({message: error.message});
   } 
};

module.exports = { getVideoGameBD};