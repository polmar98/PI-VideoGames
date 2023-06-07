import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import style from "../Details/Details.module.css";
const url ='http://localhost:3001/videogames/';  //url del servidor local


export default function Details() {
    const params = useParams();
    const [videos, setVideos] = useState({});
    const [generos, setGeneros] = useState('');
    const [plataformas, setPlataformas] = useState('');

    useEffect(() => {
        fetch(`${url}${params.id}`)
        .then((response) => response.json())
        .then((video) => {
            if (video.name) {
              setVideos(video);

              //Cargamos el array de generos en el Hook generos
              let listGenres = video.Genres.join('-');

              setGeneros(listGenres); 
              //cargamos el array de platforms en el hook plataformas
              let listPlatforms = video.Platforms.join('-');

              setPlataformas(listPlatforms); 
            } else {
              window.alert("No hay videos con ese ID");
            }
        })
        .catch((err) => {
            window.alert("No se pudo realizar la consulta");
        });
        return setVideos({});
    }, [params.id]);

    return (
    <div>
       <div className={style.caja}>
          <img className={style.imagen} src={videos.image} alt="" /> 
          <div className={style.Tarjeta}>
             <div className={style.Titulo}>{videos.name}</div>
             <div className={style.descripcion}
                 dangerouslySetInnerHTML={{__html: videos.description}}
             />
             <div className={style.subcaja}>
                <div className={style.division}>
                    <h3 className={style.subtitulo}>Genres</h3>
                    <h4 className={style.detalles}>{generos}</h4>
                 </div>
                <div className={style.division}>
                    <h3 className={style.subtitulo}>Platforms</h3>
                    <h4 className={style.detalles}>{plataformas}</h4>
                </div>
             </div>
             <h4 className={style.rating}>Rating: {videos.rating}</h4>
             <h4 className={style.rating}>Released: {videos.released}</h4>
             <h4 className={style.rating}>Id: {videos.id}</h4>
          </div>
       </div>
    </div>
    )
 };
 