import axios from 'axios';
const URL = 'http://localhost:3001/';

const getVideos = () => {
    return async(dispatch) => {
        var json = await axios.get(URL);
        return dispatch({
            type: 'GET_VIDEOS',
            payload: json.data
        })
    }
};

const searchVideosByName = (searchName)=>{
    return async(dispatch) => {
        try {
            var json = await axios.get(`${URL}videogames?name=${searchName}`);
            return dispatch({
                type: 'SEARCH_VIDEOS_BYNAME',
                payload: json.data
            })
        } catch (error) {
           window.alert("No hay registros");            
        }
    }
};

const filterVideosByGenre = (genero) => {
   return {
     type: 'FILTER_BY_GENRE',
     payload: genero
   }
};

const filterVideosbyOrigen = (origen) => {
    return {
        type: 'FILTER_BY_ORIGEN',
        payload: origen
    }
};

const getGenres =() => {
    return async(dispatch) => {
        var json = await axios.get(`${URL}genres`);
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }    
};

const getPlatforms =() =>{
    return async(dispatch) => {
        var json = await axios.get(`${URL}platforms`);
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
};

const orderByName = (tipoOrden) => {
    return {
        type: 'ORDER_BY_NAME',
        payload: tipoOrden
    }
};

const orderByRating = (tipoOrden) => {
    return {
        type: 'ORDER_BY_RATING',
        payload: tipoOrden
    }
};

const createVideo = (newVideo) => {

    return async(dispatch) => {
        const response = await axios.post(`${URL}videogames`, newVideo);
        const result =response.data.message;
        return dispatch({
            type: 'CREATE_VIDEOS',
            payload: result
        })
    }
};

module.exports = 
    getVideos,
    getGenres,
    getPlatforms,
    createVideo,
    orderByRating,
    orderByName,
    filterVideosbyOrigen,
    filterVideosByGenre,
    searchVideosByName,
    createVideo,
;