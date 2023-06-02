import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import style from "../Details/Details.module.css";
const url ='http://localhost:3001/videogames/';  //url del servidor local


export default function Details() {
    const params = useParams();
    const [videos, setVideos] = useState({});
    const [generos, setGeneros] = useState([]);
    const [plataformas, setPlataformas] = useState([]);

    useEffect(() => {
        fetch(`${url}${params.id}`)
        .then((response) => response.json())
        .then((video) => {
            if (video.name) {
              setGeneros(video.genres); 
              setPlataformas(video.platforms); 
              setVideos(video);
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
             <p className={style.descripcion}>{videos.description}</p>
             <div className={style.subcaja}>
                <div className={style.division}>
                    <h3 className={style.subtitulo}>Genres</h3>
                    {generos.map(ele => <h4 className={style.detalles}>{ele.name}</h4>)}
                 </div>
                <div className={style.division}>
                    <h3 className={style.subtitulo}>Platforms</h3>
                    {plataformas.map(ele => <h4 className={style.detalles}>{ele.platform.name}</h4>)}
                </div>
             </div>
          </div>
       </div>
       <div className={style.lineaFinal}>
            <h4 className={style.rating}>Rating: {videos.rating}</h4>
            <h4 className={style.rating}>Released: {videos.released}</h4>
       </div>
    </div>
    )
 };
 