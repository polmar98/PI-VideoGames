import React from "react";
import style from "../About/About.module.css";
import soyHenry from "../../img/soyhenry.webp";
import fotoPol from "../../img/pol.jpg";

export default function About() {
    return (
        <div className={style.principal}>
            <div className={style.Tarjeta}>
               <div className={style.gridContainer}>
                   <div className={style.caja}>
                       <div className={style.Titulo}>Paul Fernando Martinez Navarro</div>
                   </div>
                   <div className={style.caja}>
                       <div className={style.Subtitulo}>Developer Design Full Stack</div>
                    </div>
                   <div className={style.caja}>
                      <img src={soyHenry} alt="" className={style.logoHenry}/>
                   </div>
                   <div className={style.caja}>
                   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut animi laborum, corporis libero provident in dolorum nostrum, quasi asperiores blanditiis dicta enim quidem tempora quae architecto, illo ducimus perspiciatis labore.
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum recusandae omnis veritatis aliquid autem quod ipsa doloremque asperiores? Natus facilis perspiciatis eos harum non tempora, ad cupiditate iusto voluptatum eligendi.
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ut illum reprehenderit velit officiis delectus dicta animi quaerat quidem molestias sequi laboriosam facilis illo recusandae quis, modi laudantium vero aperiam!
                   </div>
                   <div className={style.caja}>
                     <ul>
                        <li className={style.itemLista}>Node-Js</li>
                        <li className={style.itemLista}>React</li>
                        <li className={style.itemLista}>Php-Laravel-Ajax</li>
                        <li className={style.itemLista}>C#</li>
                        <li className={style.itemLista}>Css</li>
                        <li className={style.itemLista}>Visual FoxPro</li>
                     </ul>
                   </div>
                   <div className={style.caja}>
                      <ul>
                        <li className={style.itemLista}>Postgress</li>
                        <li className={style.itemLista}>Mysql</li>
                        <li className={style.itemLista}>Sql</li>
                      </ul>
                   </div>
                   <div className={style.caja}>
                      <img src={fotoPol} alt="" className={style.fotoPol}/> 
                   </div>


               </div>
            </div>
        </div>
    )
}