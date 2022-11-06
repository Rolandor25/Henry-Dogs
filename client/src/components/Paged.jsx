import React from "react";
import './styles/paged.css';
import { useSelector} from "react-redux";

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// BARRA DE PAGINADO
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function Paged({dogsPage, doglist, paged}) {
    const pages = [];
    for (let i = 1; i <= Math.ceil(doglist/dogsPage); i++) {
        pages.push(i)
    };    
    return(
        <div>
            {
                pages.length <= 1 ? 
                <></> :
                <ul className="pages">
                    {pages?.map(p =>(
                        <li className="page" key={p}>
                            <button className="pageBtn" onClick={() => paged(p)} style={{width:"30px"}}>{p}</button>
                        </li>
                    ))}
                </ul>
            }  
        </div>
    )
};