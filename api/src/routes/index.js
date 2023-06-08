const { Router } = require('express');
const {getVideoGames} = require('../controllers/getVideoGames');
const {addVideoGame} = require('../controllers/addVideoGame');
const {getVideoGameById} = require('../controllers/getVideoGameById');
const {getGenres} = require('../controllers/getGenres');
const {getVideoGameByName} = require('../controllers/getVideoGameByName');
const {getPlatforms} = require('../controllers/getPlatforms');

const router = Router();
router.get('/', getVideoGames);
router.get('/videogames/:id', getVideoGameById);
router.get('/videogames', getVideoGameByName);
router.post('/videogames', addVideoGame);
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);




module.exports = router;
