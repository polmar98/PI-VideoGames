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
                       <div className={style.description}>
                           Systems Professional. Work experience as a maintenance technician, computer repair, support, installation and administration of networks and as a software analyst and developer.
                           Trained in the Technical field for the development of the profession in general, with a high degree of professionalism and excellent ability to analyze equipment diagnoses, fault detection, solution proposals and repair thereof.
                           With excellent experience in the installation, configuration and maintenance of Novell Netware networks, Windows Server, Workgroups, NT Server and Wireless networks. Practical ability in handling structured cabling.
                           Trained in the field of Software with extensive skills for the analysis and development of applications for data management, with high knowledge of accounting, Payroll, Banks, Billing, Inventories, Portfolio and Customer management, Portfolio and Supplier management, Property Management Horizontal, Hotel management, Financial credits and other fields.
                           Trained to develop web applications with skillful management of tools such as node-js, express, react, php, laravel, ajax, jquery and excellent management and administration of databases in mysql, sql, postgress.
                       </div>
                   </div>
                   <div className={style.caja}>
                     <ul className={style.Lista}>
                        <li className={style.itemLista}>Node-Js - Express</li>
                        <li className={style.itemLista}>React</li>
                        <li className={style.itemLista}>Php-Laravel-Ajax</li>
                        <li className={style.itemLista}>C#</li>
                        <li className={style.itemLista}>Css</li>
                        <li className={style.itemLista}>Visual FoxPro</li>
                     </ul>
                   </div>
                   <div className={style.caja}>
                      <ul className={style.Lista}>
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