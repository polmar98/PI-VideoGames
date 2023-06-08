import style from '../Navbar/Navbar.module.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
       <div className={style.Barra}>
           <h2 className={style.titulo}>VideoGames</h2>
           <div className={style.divMenu}>
               <ul className={style.Menu}>
                   <NavLink to="/home"><li className={style.itemsMenu}>Home</li></NavLink>
                   <NavLink to="/"><li className={style.itemsMenu}>Landing</li></NavLink>
                   <NavLink to="/About"><li className={style.itemsMenu}>About</li></NavLink>
                   <NavLink to="/Form"><li className={style.itemsMenu}>Create/Game</li></NavLink>
               </ul>
           </div>
       </div>
    )
}        