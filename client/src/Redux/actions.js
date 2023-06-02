import axios from 'axios';

export function getVideos() {
    return async(dispatch) => {
        var json = await axios.get(URL);
        return dispatch({
            type: 'GET_VIDEOS',
            payload: json.data
        })
    }
}