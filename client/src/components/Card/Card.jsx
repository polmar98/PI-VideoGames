import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";

export default function Card({id,name,image,released,genres}) {
    const l = genres.length;
    for(let i=4;i>l;i--){
       genres.push({name:" _ "})
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
             <div className={style.containerDetalles}>
                <h4 className={style.detalleTitulo}>Genres</h4>
                {genres.map(ele =>
                   <h4 className={style.detalles}>{ele.name}</h4>
                )}
             </div>
        </div>    
    )
};