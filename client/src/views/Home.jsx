import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVideos,
         getGenres,
         filterVideosByGenre,
         filterVideosbyOrigen,
         orderByName,
         orderByRating,
         cambiarPagina
       } from "../Redux/actions";
import Cards from "../components/Cards/Cards"
import Paginado from "../components/Paginado/Paginado";
import style from "../views/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";


export default function Home(props) {
    const dispatch = useDispatch();
    const Videos = useSelector((state) => state.videoGames);
    const Genres = useSelector((state) => state.GenresState);
    const retorno = useSelector((state) => state.retorno);
    const pagActual = useSelector((state) => state.paginaActual);
    const jfiltro = useSelector((state) => state.filtroOrigen);
    //declaramos las variables para el paginado
    const [currentPage, setCurrentPage] = useState(pagActual);   //inicializamos la primera pagina en 1
    const videosPerPage = 15; //declaramos 15 videos x pagina
    const indexOfLastVideo = currentPage * videosPerPage;  //declaramos indice del ultimo video
    const indexOfFirtsVideo = indexOfLastVideo - videosPerPage;  //declaramos indice del primer video
    const currentVideos = Videos.slice(indexOfFirtsVideo, indexOfLastVideo); //decalramos videos de la pagina actual
    console.log("DesdeHome:",jfiltro);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(cambiarPagina(pageNumber));
    }

    useEffect(() => {
        dispatch(getVideos(retorno));
        dispatch(getGenres());
    },[]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideos());
    };

    function handleFilterGenre(e) {
          dispatch(filterVideosByGenre(e.target.value));
          setCurrentPage(1);
    };

    function handleFilterOrigen(e) {
        dispatch(filterVideosbyOrigen(e.target.value));
        setCurrentPage(1);
    };

    function handleOrderByName(e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    };

    function handleOrderByRating(e) {
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
    };


    return (
        <div>
           <Navbar/>
           <button className={style.reset} onClick={e => handleClick(e)}>Reset</button> 
           <div className={style.panel}>
           <div className={style.gridContainer}>
               <h3 className={style.tituloSelector}>Order by Name</h3>
               <h3 className={style.tituloSelector}>Order by Rating</h3>
               <h3 className={style.tituloSelector}>Filter by Origin</h3>
               <h3 className={style.tituloSelector}>Filter by Genre</h3>
 
              <select onChange={e => handleOrderByName(e)} className={style.selector} id="selName">
                  <option value='xxx'>Select Options</option>
                  <option value='Asc'>Ascendent</option>
                  <option value='Des'>Descendent</option>
              </select>
              <select onChange={e => handleOrderByRating(e)} className={style.selector} id="selRat">
                  <option value='xxx'>Select Options</option>
                  <option value='Asc'>Ascendent</option>
                  <option value='Des'>Descendent</option>
              </select>
              <select onChange={e => handleFilterOrigen(e)} className={style.selector} id="selOri">
                  <option value='All'>All</option>
                  <option value='True'>Created</option>
                  <option value='False'>Api</option>
              </select>
              <select onChange = {e => handleFilterGenre(e)} className={style.selector} id="selGenre">
                  <option value='All'>All</option>
                  {Genres.map(element => 
                    <option value={element.name}>{element.name}</option>
                  )}
              </select>
           </div>
           </div>
           <div className={style.paginado}>
              <Paginado
                  videosPerPage={videosPerPage}
                  lenVideos={Videos.length}
                  paginado={paginado}
                  actualPage={currentPage}
              />
           </div>
           <SearchBar/>
           <Cards Videos={currentVideos}/>
        </div>
    )
}