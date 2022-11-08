import React from "react";
import './styles/paged.css';

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// BARRA DE PAGINADO
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function Paged({dogsPage, doglist, paged,pageprev,pagenext}) {
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
                    <li><button className="pageBtn" onClick={() => paged(pageprev,pages.length)} style={{width:"50px"}}> Prev</button></li>
                    {pages?.map(p =>(
                        <li  key={p}>
                            <button className="pageBtn" onClick={() => paged(p,pages.length)} style={{width:"30px"}}>{p}</button>
                        </li>
                    ))}
                    <li><button className="pageBtn" onClick={() => paged(pagenext,pages.length)} style={{width:"50px"}}> Next</button></li>
                </ul>
            }  
        </div>
    )
};