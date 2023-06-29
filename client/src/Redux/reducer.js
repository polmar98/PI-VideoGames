const initialState = { 
   videoGames: [],
   GenresState: [],
   allVideos: [],
   platformsState: [],
   filtroGenre: "All",
   filtroOrigen: "All",
   retorno: false,
   paginaActual: 1,
};

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case 'GET_VIDEOS':
            return {...state, 
                   videoGames: payload, 
                   allVideos: payload,
                   filtroGenre: "All",
                   filtroOrigen: "All",
            };  
        case 'FILTER_BY_GENRE':
            console.log("Origen:",state.filtroOrigen);
            let copiaVideos = state.allVideos;
            if(state.filtroOrigen === "True") {
                copiaVideos = state.allVideos.filter(ele => ele.createdInDb===true);
            };    
            if(state.filtroOrigen === "False") {
                copiaVideos = state.allVideos.filter(ele => ele.createdInDb===false);
            };    
            const filtrados = payload==='All' 
                  ? copiaVideos 
                  : copiaVideos.filter(ele => ele.Genres.find(e => e===payload));
            return {...state, videoGames: filtrados, filtroGenre: payload};    
        case 'GET_GENRES':
            return {...state, GenresState: payload};  
        case 'GET_PLATFORMS':
            return {...state, platformsState: payload};    
        case 'FILTER_BY_ORIGEN':
            let copiaVideos1 = state.allVideos;
            if(state.filtroGenre !== "All") {
                copiaVideos1 = copiaVideos1.filter(ele => ele.Genres.find(e => e===state.filtroGenre));
            };
            if(payload === "All") {
                return {...state, videoGames: copiaVideos1, filtroOrigen: payload};
            };    
            const filtros = payload==="True" 
               ? copiaVideos1.filter(ele => ele.createdInDb===true)
               : copiaVideos1.filter(elex => elex.createdInDb===false)
            return {...state, videoGames: filtros, filtroOrigen: payload};    
        case 'ORDER_BY_NAME':
            let orden = [...state.videoGames];
            if(payload === "xxx") {
                return {...state};
            }
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
            if(payload === "xxx") {
                return {...state};
            }
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
        case 'RETURN_VIDEOS':
            return {...state, retorno: payload};      
        case 'CAMBIAR_PAGINA':
            return {...state, paginaActual: payload} ;        
        default:
            return {...state};           
    }
}

export default reducer;