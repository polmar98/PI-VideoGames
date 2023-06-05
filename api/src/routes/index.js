const { Router } = require('express');
const {addVideoGame} = require('../controllers/addVideoGame');
const {getVideoGameBD} = require('../controllers/getVideoGameBD');
const {getVideoGameById} = require('../controllers/getVideoGameById');
const {getGenres} = require('../controllers/getGenres');
const {getVideoGameByName} = require('../controllers/getVideoGameByName');
const {getVideoGameApi} = require('../controllers/getVideoGameApi');
const {getPlatforms} = require('../controllers/getPlatforms');

const router = Router();
router.get('/', getVideoGameApi);
router.get('/videogames/:id', getVideoGameById);
router.get('/videogames', getVideoGameByName);
router.post('/videogames', addVideoGame);
router.get('/videos', getVideoGameBD);
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);




module.exports = router;
