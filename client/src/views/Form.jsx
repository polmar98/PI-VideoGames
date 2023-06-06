import React from "react";
import style from "../views/Form.module.css";
import { getGenres, getPlatforms, createVideo } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sindatos from "../img/Sin_datos.jpg";
import validation from "./validation";

const validate = function (form, errors, setErrors) {
  //aqui van las validaciones
};



export default function Form(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Genres = useSelector((state) => state.GenresState);
    const Platforms = useSelector((state) => state.platformsState);
    const [form, setForm] = useState({
      name: "",
      rating: "",
      description: "",
      released: "",
      genres: [],
      platforms: [],
      image: "",
    });
    const [errors, setErrors] = useState({
       name: "", rating: "", released: "", description: "", genres: "", platforms: "", image: ""});


    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    },[]);

    const submitHandler = (e) => {
       e.preventDefault();
       dispatch(createVideo(form));
       window.alert("VideoGame Creado");
       setForm({
         name: "",
         rating: "",
         description: "",
         released: "",
         genres: [],
         platforms: [],
         image: "",
       });
       navigate('/');
    };

    const handleChange = (event) => {
      const property = event.target.name;
      const value = event.target.value;
      //setErrors(validation({...form, [property]: value}));
      setForm({...form, [property]: value });
      //validate({...form, [property]: value}, errors, setErrors);
    };

    const handleSelectorGenres = (e) => {
       setForm({...form, genres: [...form.genres, e.target.value]});
    };

    const handleSelectorPlatforms = (e) => {
      setForm({...form, platforms: [...form.platforms, e.target.value]});
    };

    const handleChangeImage = (e) => {
      const objImage = document.getElementById("idImage");
      objImage.src=e.target.value;
      setForm({...form, image: e.target.value });
    };

    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
               <h1 className={style.Titulo}>New VideoGame</h1>
               <form  onSubmit={submitHandler}>
               <div className={style.gridContainer}>
                   <label className={style.etiqueta}>Name</label>
                   <input type="text" name="name" onChange={handleChange} value={form.name}/>
                   <label className={style.etiqueta}>Rating</label>
                   <input type="number" name="rating" onChange={handleChange} value={form.rating}/>
                   <label className={style.etiqueta}>Description</label>
                   <textarea name="description" onChange={handleChange}>{form.description}</textarea>
                   <label className={style.etiqueta}>Released</label>
                   <input type="date" name="released" onChange={handleChange} value={form.released}/>
                   <label className={style.etiqueta}>Genres</label>
                   <select multiple name="genres" onChange={handleSelectorGenres}>
                      {Genres.map(prop =>
                         <option value={prop.id} >{prop.name}</option>  
                      )}
                   </select>
                   <label className={style.etiqueta}>Platforms</label>
                   <select multiple name="platforms" onChange={handleSelectorPlatforms}>
                      {Platforms.map(p =>
                         <option value={p.id}>{p.name}</option>  
                      )} 
                   </select>
                   <label className={style.etiqueta}>Url Image</label>
                   <input type="text" name="image"  onChange={handleChangeImage} value={form.image}/>
                   <label className={style.etiqueta}>&nbsp;</label>
                   <button type="submit" className={style.boton}>Submit</button>
                </div> 
                </form>  
            </div>
            <div className={style.Tarjeta}>
               <h1 className={style.Titulo}>Image</h1>
               <img src={sindatos} alt="" className={style.imagen} id="idImage"/>
               <ul><li>{form.genres.map(el=>el+" ,")}</li></ul>
            </div>   
        </div>
    )
}