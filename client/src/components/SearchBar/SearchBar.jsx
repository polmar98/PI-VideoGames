import style from '../SearchBar/SearchBar.module.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchVideosByName } from '../../Redux/actions';

export default function SearchBar(props) {
   const dispatch = useDispatch();
   const [nameToSearch, setNameToSearch] = useState("");
   const handleChange = (event) => {
      event.preventDefault();
      setNameToSearch(event.target.value);
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(searchVideosByName(nameToSearch));
   }

   return (
      <div>
         <input className={style.input}
                type='text'
                placeholder="Search by Name"
                onChange={handleChange}
                value={nameToSearch} />
         <button className={style.boton}
               onClick={ (e)=>{handleSubmit(e)}} >Search
         </button>
      </div>
   );
}