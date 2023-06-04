import React from "react";
import style from "../Paginado/Paginado.module.css";

export default function Paginado({videosPerPage, lenVideos, paginado}) {
    const pageNumbers = [];
    for(let i=0; i<Math.ceil(lenVideos/videosPerPage); i++) {
        pageNumbers.push(i+1);
    };

    return (
        <div>
            <ul className={style.paginado}>
                {pageNumbers && 
                   pageNumbers.map(number => (
                      <li className={style.itemsPaginado} key={number}>
                         <a onClick={()=>paginado(number)}>{number}</a>
                      </li>
                   ))
                }
            </ul>
        </div>
    )

};