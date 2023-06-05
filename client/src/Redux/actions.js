import axios from 'axios';
const URL = 'http://localhost:3001/';

export function getVideos() {
    return async(dispatch) => {
        var json = await axios.get(URL);
        return dispatch({
            type: 'GET_VIDEOS',
            payload: json.data
        })
    }
}
export function searchVideosByName(searchName) {
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
}

export function filterVideosByGenre(genero) {
   return {
     type: 'FILTER_BY_GENRE',
     payload: genero
   }
}

export function filterVideosbyOrigen(origen) {
    return {
        type: 'FILTER_BY_ORIGEN',
        payload: origen
    }
}

export function getGenres() {
    return async(dispatch) => {
        var json = await axios.get(`${URL}genres`);
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }    
}

export function getPlatforms() {
    return async(dispatch) => {
        var json = await axios.get(`${URL}platforms`);
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function orderByName(tipoOrden) {
    return {
        type: 'ORDER_BY_NAME',
        payload: tipoOrden
    }
}

export function orderByRating(tipoOrden) {
    return {
        type: 'ORDER_BY_RATING',
        payload: tipoOrden
    }
}