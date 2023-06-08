import React from "react";
import style from './Form.module.css';
import { getGenres, getPlatforms, createVideo } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { UNSAFE_DataRouterContext, useNavigate } from "react-router-dom";
import sindatos from "../../img/Sin_datos.jpg";
import fail from "../../img/fail.jpg";
import good from "../../img/good.jpg";


const validate = function (form) {
  //aqui van las validaciones
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



export default function Form(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Generes = useSelector((state) => state.GenresState);
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
       window.alert("VideoGame Created");
        /* 
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
       */
    };

    const handleChange = (event) => {
      event.preventDefault();
      const property = event.target.name;
      const value = event.target.value;
      setForm({...form, [property]: value });
      setErrors(validate({...form, [property]: value}));

    };

    function handleSelectorGenres(e) {
       const dato = e.target.value;
       setForm({
          ...form,
          genres: [...form.genres, dato]
       });
       console.log("Sel", form.genres);
    };

    const handleSelectorPlatforms = (e) => {
      e.preventDefault();
      setForm({...form, platforms: [...form.platforms, e.target.value]});
      console.log("Platform",form.platforms);
      setErrors(validate({...form, platforms: e.target.value}));
    };

    const handleChangeImage = (e) => {
      e.preventDefault();
      const objImage = document.getElementById("idImage");
      objImage.src=e.target.value;
      setForm({...form, image: e.target.value });
      setErrors(validate({...form, image: objImage}));
    };

    const handleDeleteGenre = (el) => {
      setForm({...form, genres: form.genres.filter(g => g !== el)});
    };

    const handleDeletePlatform = (el) => {
      setForm({...form, platforms: form.platforms.filter(g => g !== el)});
    };

    //<ul><li>{form.genres.map(el=>el+" ,")}</li></ul>
    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
               <h1 className={style.Titulo}>New VideoGame</h1>
               <form  onSubmit={submitHandler}>
               <div className={style.gridContainer}>
                   <label className={style.etiqueta}>Name</label>
                   <input type="text" name="name" onChange={handleChange} value={form.name}/>
                   <img src={errors.name ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Rating</label>
                   <input type="number" name="rating" onChange={handleChange} value={form.rating}/>
                   <img src={errors.rating ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Description</label>
                   <textarea name="description" onChange={handleChange}>{form.description}</textarea>
                   <img src={errors.description ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Released</label>
                   <input type="date" name="released" onChange={handleChange} value={form.released}/>
                   <img src={errors.released ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Genres</label>
                   <select name="genres" onChange={(e)=>handleSelectorGenres(e)}>
                      {Generes.map(prop =>
                         <option value={prop.name} >{prop.name}</option>  
                      )}
                   </select>
                   <img src={errors.genres ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Platforms</label>
                   <select name="platforms" onChange={handleSelectorPlatforms}>
                      {Platforms.map(p =>
                         <option value={p.id}>{p.name}</option>  
                      )} 
                   </select>
                   <img src={errors.platforms ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>Url Image</label>
                   <input type="text" name="image"  onChange={handleChangeImage} value={form.image}/>
                   <img src={errors.image ? fail : good} alt="" className={style.estado}/>

                   <label className={style.etiqueta}>&nbsp;</label>
                   <button type="submit" className={style.boton}>Submit</button>
                </div> 
                </form>  
            </div>
            <div className={style.Tarjeta}>
               <img src={sindatos} alt="" className={style.imagen} id="idImage"/>
               <div className={style.divGenres}>
                  {form.genres.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX} onClick={handleDeleteGenre(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>

               <div className={style.divPlatforms}>
                  {form.platforms.map(el =>
                     <div className={style.itemGenres}>
                        <button className={style.botonX} onClick={handleDeletePlatform(el)}>X</button>
                        <p className={style.genreItem}>{el}</p>
                     </div>
                  )}
               </div>
               <div className={style.cajaErrores}>
                   <h6 className={style.detaError}>{errors.name}-{errors.rating}-{errors.description}-{errors.image}</h6>
                   <h6 className={style.detaError}>{errors.released}-{errors.genres}-{errors.platforms}</h6>
               </div>  
            </div> 

        </div>
    )
}