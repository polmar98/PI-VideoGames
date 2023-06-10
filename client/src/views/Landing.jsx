import React from "react";
import style from "../views/Landing.module.css";
import imagen from "../img/videogames10.webp";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/home');
    };

    return (
       <div>
          <div className={style.panel}>
             <h1 className={style.titulo}>Wellcome to VideoGames API</h1>
             </div>   
          <img src={imagen} className={style.imagen} alt="" />
          <div className={style.panel}>
             <h1 className={style.boton} onClick={handleNavigate}>Go Explore</h1>
          </div>
          
       </div> 
        
    )
}