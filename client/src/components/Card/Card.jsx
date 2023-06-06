import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import sinImagen from "../../img/Sin_datos.jpg";

export default function Card({id,name,image,released,genres,rating,platforms,createdInDb}) {
    let l = genres.length;
    console.log(genres);
    let listGenres = createdInDb ? genres[0].name : genres[0];
    for(let i=1;i<l;i++){
       listGenres+= createdInDb ? ', '+genres[i].name : genres[i];
    };
    l = platforms.length;
    let listPlatforms = platforms[0];
    for(let j=1;j<l;j++){
      listPlatforms+= ', '+platforms[j];
    };    
    //validamos si hay imagen
    const imagen = image ? image : sinImagen;
    return (
        <div className={style.tarjeta}>
             <Link to={`/Details/${id}`}> 
                <div className={style.containerTitulo}>
                   <h3 className={style.Titulo}>{name}</h3>
                </div>
             </Link>
             <Link to={`/Details/${id}`}> 
                 <img className={style.imagen} src={imagen} alt="" /> 
             </Link>  
             <h3 className={style.subtitulo}>Rating : {rating}</h3>  
             <div className={style.containerDetalles}>
                <h5 className={style.detallesGenres}>Genres: {listGenres}</h5>
              </div>
              <h3 className={style.subtitulo}>Released : {released}</h3>  
        </div>    
    )
};