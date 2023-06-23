const initialState = { 
   videoGames: [],
   GenresState: [],
   allVideos: [],
   platformsState: [],
};

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case 'GET_VIDEOS':
            return {...state, videoGames: payload, allVideos: payload};  
        case 'FILTER_BY_GENRE':
            const copiaVideos = state.allVideos;
            console.log(payload);
            const filtrados = payload==='ALL' ? copiaVideos : copiaVideos.filter(ele => ele.Genres.find(e => e===payload));
            return {...state, videoGames: filtrados};    
        case 'GET_GENRES':
            return {...state, GenresState: payload};  
        case 'GET_PLATFORMS':
            return {...state, platformsState: payload};    
        case 'FILTER_BY_ORIGEN':
            const copiaVideos1 = state.allVideos;
            if(payload === "All") return {...state, videoGames: state.allVideos};
            const filtros = payload==="True" 
               ? copiaVideos1.filter(ele => ele.createdInDb===true)
               : copiaVideos1.filter(elex => elex.createdInDb==false)
            return {...state, videoGames: filtros};    
        case 'ORDER_BY_NAME':
            let orden = [...state.videoGames];
            let orderVideos = orden.sort((a,b) => {
                if(a.name > b.name) {
                    return payload === 'Asc' ? 1 : -1
                } else if (a.name < b.name) {
                    return payload === 'Des' ? 1 : -1
                } else return 0;
            }) 
            return {...state, videoGames: orderVideos};     
        case 'ORDER_BY_RATING':
            let ordenR = [...state.videoGames];
            let orderVideosR = ordenR.sort((a,b) => {
               if(Number(a.rating) > Number(b.rating)) {
                   return payload === 'Asc' ? 1 : -1
               } else if (Number(a.rating) < Number(b.rating)) {
                   return payload === 'Des' ? 1 : -1
               } else return 0;
            }) 
            return {...state, videoGames: orderVideosR};   
        case 'SEARCH_VIDEOS_BYNAME':
            return {...state, videoGames: payload};   
        case 'CREATE_VIDEOS':
            window.alert(payload);
            return {...state};           
        default:
            return {...state};           
    }
}

export default reducer;