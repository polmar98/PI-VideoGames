import style from '../SearchBar/SearchBar.module.css';


export default function SearchBar(props) {

   return (
      <div>
         <input className={style.input} type='search' />
         <button className={style.boton}>Buscar</button>
      </div>
   );
}