import React from "react";
import { getGenres, getPlatforms, createVideo } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './NewForm.module.css';
import fail from "../../img/fail.jpg";
import good from "../../img/good.jpg";
import sindatos from "../../img/Sin_datos.jpg";

const validate = function (form) {
    let errors = {};
    errors.submit ="";
    if(!form.name) {
       errors.name = "Name required";
       errors.submit = "Error";
    } else if(!form.name.length>100) {
       errors.name = "name string cannot be longer than 100 characters";   
       errors.submit = "Error";
    } else if(form.name.length<5) {
       errors.name = "name must have at least 5 characters";   
       errors.submit = "Error";
    } else if(!form.rating) {
       errors.rating = "Rating required";
       errors.submit = "Error";
    } else if(Number(form.rating)>5.00) {
       errors.rating = "rating cannot be greater than 5.00";
       errors.submit = "Error";
    } else if(Number(form.rating)<0) {
       errors.rating = "rating cannot be less than 0.00";  
       errors.submit = "Error"; 
    } else if(!form.description) {
       errors.description = "Description required";
       errors.submit = "Error";
    } else if(!form.released) {
       errors.released = "Released date required";
       errors.submit = "Error";
    } else if(!form.genres.length) {
       errors.genres = "You must select at least one gender";
       errors.submit = "Error";
    } else if(!form.platforms.length) {
       errors.platforms = "You must select at least one platform";
       errors.submit = "Error";
    } else if(!form.image) {
       errors.image = "Image required";
       errors.submit = "Error";
    }
 
    return errors;
};


export default function NewForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        name: "Name is required", rating: "", released: "", description: "", genres: "", platforms: "", image: "", submit: "Error"});

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

    //esta funcion agrega la seleccion de un genero al estado local oform.genres
    const handleSelectorGenres =(e) =>{
        //buscamos primero si ya existe
        const buscado = oform.genres.find(ele=>ele===e.target.value);
        if(buscado) return;
        setOform({
           ...oform,
           genres: [...oform.genres, e.target.value]
        });
        setErrors(validate({...oform, genres: [...oform.genres, e.target.value]}));
     };
 
     //esta funcion agrega la seleccion de una plataforma al estado local oform.platforms
     function handleSelectorPlatforms(e) {
       const dato = e.target.value;
       //buscamos primero si ya existe
       const buscado = oform.platforms.find(ele=>ele===dato);
       if(buscado) return;
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

     //esta funcion hace el llamado a la accion que creara el videogame
     const handleSubmit = (e) => {
        e.preventDefault();
        const sel_genres = genaArrGenres();
        const sel_platforms = genaArrPlatforms();
  
        //mapeamos la nueva estructura del json a enviar
        const json = {
              name: oform.name,
              rating: oform.rating,
              description: oform.description,
              released: oform.released,
              genres: sel_genres,
              platforms: sel_platforms,
              image: oform.image,
        }

        dispatch(createVideo(json));
        navigate('/home');
     };

     //esta funcion elimina las Genres seleccionadas al dar click en el boton X
     function handleDeleteGenre(el)  {
        const dato =el.target.value;
        console.log(dato);
        setOform({...oform, genres: oform.genres.filter(g => g !== dato)});
        setErrors(validate({...oform, genres: oform.genres.filter(g => g !== dato)}));
     };

     //esta funcion elimina las plataformas seleccionadas al dar click en el boton X
     function handleDeletePlatform(el) {
        const dato =el.target.value;
        setOform({...oform, platforms: oform.platforms.filter(g => g !== dato)});
        setErrors(validate({...oform, platforms: oform.platforms.filter(g => g !== dato)}));
     };

    //esta funcion devuelve un array solo con los id de los generos seleccionados
    const genaArrGenres = () => {
        let arr = [];
        oform.genres.forEach(g => {
            let ele = Generos.find(x => x.name === g);
            arr.push(ele.id);
        });
        return arr;
    };

    //esta funcion devuelve un array solo con los id de las plataformas seleccionadas
     const genaArrPlatforms = () => {
        let arr = [];
        oform.platforms.forEach(g => {
            let ele = Plataformas.find(x => x.name === g);
            arr.push(ele.id);
        });
        return arr;
    };   

    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
            <h2 className={style.Titulo}>VideoGame Creation</h2>    
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
                <button type="submit" 
                        className={errors.submit ? style.submitInactivo :style.submitActivo}
                        disabled={errors.submit ? true : false}
                        >Submit
                </button>
                </div>
                </form>
                <div className={style.panelErrors}>
                   <p className={errors.submit ? style.errorMessage : style.errorVacio}>
                      { errors.name ? errors.name :
                        errors.rating ? errors.rating :
                        errors.description ? errors.description :
                        errors.released ? errors.released :
                        errors.genres ? errors.genres :
                        errors.platforms ? errors.platforms :
                        errors.image ? errors.image :
                        <h4>&nbsp;</h4>
                      }
                   </p>
                </div>
            </div>

            <div className={style.TarjetaB}>
               <div className={style.divGenres}>
                  <div className={style.etiqueta}>Genres</div>
                  {oform.genres.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX}
                                value={el}
                                onClick={(el)=>handleDeleteGenre(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>
               <div className={style.divGenres}>
                  <div className={style.etiqueta}>Platforms</div>
                  {oform.platforms.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX}
                                value={el}
                                onClick={(el)=>handleDeletePlatform(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>
               <img src={sindatos} alt="" className={style.imagen} id="idImage"/>
            </div>
        </div>
    )
}