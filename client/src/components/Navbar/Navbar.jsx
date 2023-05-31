import style from '../Navbar/Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
export default function Navbar(props) {
    return (
       <div className={style.Barra}>
           <h2 className={style.titulo}>VideoGames</h2>
           <div className={style.searchbarContainer}>
                 <SearchBar/>
           </div>
       </div>
    )
}        