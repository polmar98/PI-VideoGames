import React from "react";
import style from "../views/Landing.module.css";
import imagen from "../img/videogames10.webp";

export default function Landing() {
    return (
       <div>
          <h1 className={style.titulo}>Wellcome to VideoGames API</h1>
          <img src={imagen} className={style.imagen} alt="" />
       </div> 
        
    )
}