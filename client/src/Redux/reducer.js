const initialState = { 
   videoGames: [],
};

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case 'GET_VIDEOS':
            return {...state, videoGames: payload};  
        default:
            return {...state};           
    }
}

export default reducer;