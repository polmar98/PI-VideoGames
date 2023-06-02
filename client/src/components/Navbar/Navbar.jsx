import style from '../Navbar/Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
       <div className={style.Barra}>
           <h2 className={style.titulo}>VideoGames</h2>
           <div className={style.divMenu}>
               <ul className={style.Menu}>
                   <NavLink to="/"><li className={style.itemsMenu}>Home</li></NavLink>
                   <NavLink to="/Landing"><li className={style.itemsMenu}>Landing</li></NavLink>
                   <NavLink to="/About"><li className={style.itemsMenu}>About</li></NavLink>
                   <NavLink to="Form"><li className={style.itemsMenu}>Create/Game</li></NavLink>
                   <NavLink to="/Landing"><li className={style.itemsMenu}>Logout</li></NavLink>
               </ul>
           </div>
           <div className={style.searchbarContainer}>
                 <SearchBar/>
           </div>
       </div>
    )
}        