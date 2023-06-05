import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";

export default function Card({id,name,image,released,genres,rating,platform}) {
    let l = genres.length;
    let listGenres = genres[0].name;
    for(let i=1;i<l;i++){
       listGenres+= ', '+genres[i].name;
    };
    l = platform.length;
    let listPlatforms = platform[0].platform.name;
    for(let j=1;j<l;j++){
      listPlatforms+= ', '+platform[j].platform.name;
    };    

    return (
        <div className={style.tarjeta}>
             <Link to={`/Details/${id}`}> 
                <div className={style.containerTitulo}>
                   <h3 className={style.Titulo}>{name}</h3>
                </div>
             </Link>
             <Link to={`/Details/${id}`}> 
                 <img className={style.imagen} src={image} alt="" /> 
             </Link>  
             <h3 className={style.subtitulo}>Rating : {rating}</h3>  
             <div className={style.containerDetalles}>
                <h5 className={style.detallesGenres}>Genres: {listGenres}</h5>
              </div>
              <h3 className={style.subtitulo}>Released : {released}</h3>  
        </div>    
    )
};