import React from "react";
import { getGenres, getPlatforms, createVideo } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import style from './NewForm.module.css';
import fail from "../../img/fail.jpg";
import good from "../../img/good.jpg";
import sindatos from "../../img/Sin_datos.jpg";

const validate = function (form) {
    let errors = {};
    if(!form.name) {
       errors.name = "Name required";
    } else if(!form.name.length>100) {
       errors.name = "name string cannot be longer than 100 characters";   
    } else if(form.name.length<6) {
       errors.name = "name must have at least 6 characters";   
    } else if(!form.rating) {
       errors.rating = "Rating required";
    } else if(Number(form.rating)>5.00) {
       errors.rating = "rating cannot be greater than 5.00";
    } else if(Number(form.rating)<0) {
       errors.rating = "rating cannot be less than 0.00";   
    } else if(!form.description) {
       errors.description = "Description required";
    } else if(!form.released) {
       errors.released = "Released date required";
    } else if(!form.genres.length) {
       errors.genres = "You must select at least one gender";
    } else if(!form.platforms.length) {
       errors.platforms = "You must select at least one platform";
    } else if(!form.image) {
       errors.image = "Image required";
    } else if(!form.image.length>250) {
       errors.image = "Url string cannot be longer than 250 characters";
    }
 
    return errors;
};


export default function NewForm() {
    const dispatch = useDispatch();
    const [oform, setOform] = useState({
        name: "",
        rating: "",
        description: "",
        released: "",
        genres: [],
        platforms: [],
        image: "",
    });
    const Generos = useSelector((state) => state.GenresState);
    const Plataformas = useSelector((state) => state.platformsState);
    const [errors, setErrors] = useState({
        name: "", rating: "", released: "", description: "", genres: "", platforms: "", image: ""});

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    },[]);
    

    function handleChange(e) {
        e.preventDefault();
        const property = e.target.name;
        const value = e.target.value;
        setOform({...oform, [property]: value });
        setErrors(validate({...oform, [property]: value}));
    };

    const handleSelectorGenres =(e) =>{
        setOform({
           ...oform,
           genres: [...oform.genres, e.target.value]
        });
        setErrors(validate({...oform, genres: [...oform.genres, e.target.value]}));
     };
 
     function handleSelectorPlatforms(e) {
       const dato = e.target.value;
       setOform({
          ...oform,
          platforms: [...oform.platforms, dato]
       });
       setErrors(validate({...oform, platforms: [...oform.platforms, e.target.value]}));
     };

     const handleChangeImage = (e) => {
        e.preventDefault();
        const objImage = document.getElementById("idImage");
        objImage.src=e.target.value;
        setOform({...oform, image: e.target.value });
        setErrors(validate({...oform, image: e.target.value}));
     };

     const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createVideo(oform));
        window.alert("VideoGame Created");
     };

     const handleDeleteGenre = (el) => {
        //setOform({...oform, genres: oform.genres.filter(g => g !== el)});
     };

     const handleDeletePlatform = (el) => {
        //setOform({...oform, platforms: oform.platforms.filter(g => g !== el)});
     };

    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
            <h2>Creacion de VideoGame</h2>    
            <form onSubmit={handleSubmit}>
                <div className={style.gridContainer}>
                <label className={style.etiqueta}>Name</label>
                <input type="text" name="name" onChange={(e)=>handleChange(e)} value={oform.name}/>
                <img src={errors.name ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Rating</label>
                <input type="number" name="rating" onChange={(e)=>handleChange(e)} value={oform.rating}/> 
                <img src={errors.rating ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Description</label>
                <textarea name="description" 
                          onChange={(e)=>handleChange(e)} 
                          value={oform.description}>{oform.description}
                </textarea> 
                <img src={errors.description ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Released</label>
                <input type="date" name="released" onChange={(e)=>handleChange(e)} value={oform.released}/>
                <img src={errors.released ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Genres</label>
                <select name="genres" onChange={handleSelectorGenres}>   
                   {Generos.map(prop => <option value={prop.name} >{prop.name}</option>  )}    
                </select>
                <img src={errors.genres ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Platforms</label>
                <select name="platforms" onChange={(e)=>handleSelectorPlatforms(e)}>   
                   {Plataformas.map(prop => <option value={prop.name} >{prop.name}</option>  )}    
                </select>
                <img src={errors.platforms ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>Image</label>
                <input type="text" name="image"  onChange={handleChangeImage} value={oform.image}/>
                <img src={errors.image ? fail : good} alt="" className={style.estado}/>

                <label className={style.etiqueta}>&nbsp;</label>
                <button type="submit">Submit</button>
                </div>
            </form>
            </div>
            <div className={style.TarjetaB}>
               <div className={style.divGenres}>
                  <div className={style.etiqueta}>Genres</div>
                  {oform.genres.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX} onClick={handleDeleteGenre(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>
               <div className={style.divGenres}>
                  <div className={style.etiqueta}>Platforms</div>
                  {oform.platforms.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX} onClick={handleDeletePlatform(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>
               <img src={sindatos} alt="" className={style.imagen} id="idImage"/>
            </div>
        </div>
    )
}