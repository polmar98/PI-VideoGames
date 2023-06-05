import React from "react";
import style from "../views/Form.module.css";
import { getGenres, getPlatforms } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import sindatos from "../img/Sin_datos.jpg";

export default function Form(props) {
    const dispatch = useDispatch();
    const Genres = useSelector((state) => state.GenresState);
    const Platforms = useSelector((state) => state.platformsState);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    },[]);

    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
               <h1 className={style.Titulo}>New VideoGame</h1>
               <form method="POST">
               <div className={style.gridContainer}>
                   <label className={style.etiqueta}>Name</label>
                   <input type="text" name="name"/>
                   <label className={style.etiqueta}>Rating</label>
                   <input type="number" name="rating"/>
                   <label className={style.etiqueta}>Description</label>
                   <textarea name="description"></textarea>
                   <label className={style.etiqueta}>Released</label>
                   <input type="date" name="released"/>
                   <label className={style.etiqueta}>Genres</label>
                   <select multiple name="genres">
                      {Genres.map(prop =>
                         <option value={prop.id}>{prop.name}</option>  
                      )}
                   </select>
                   <label className={style.etiqueta}>Platforms</label>
                   <select multiple name="platforms">
                      {Platforms.map(prop =>
                         <option value={prop.id}>{prop.name}</option>  
                      )} 
                   </select>
                   <label className={style.etiqueta}>Image</label>
                   <input type="file" name="image"/>
                   <label className={style.etiqueta}>&nbsp;</label>
                   <button type="submit" className={style.boton}>Submit</button>
                </div> 
                </form>  
            </div>
            <div className={style.Tarjeta}>
               <h1 className={style.Titulo}>Image</h1>
               <img src={sindatos} alt="" className={style.imagen}/>
            </div>   
        </div>
    )
}