import style from "../Card/Card.module.css";
export default function Card({id,name,image,released_at,genres}) {
    const l = genres.length;
    for(let i=4;i>l;i--){
       genres.push({name:" _ "})
    };
    console.log(genres);
    return (
        <div className={style.tarjeta}>
             <div className={style.containerTitulo}>
                <h3 className={style.Titulo}>{name}</h3>
             </div>
             <img className={style.imagen} src={image} alt="" /> 
             <div className={style.containerDetalles}>
                <h4 className={style.detalleTitulo}>Genres</h4>
                {genres.map(ele =>
                   <h4 className={style.detalles}>{ele.name}</h4>
                )}
             </div>
        </div>    
    )
};