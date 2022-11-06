import React from 'react';
import {NavLink} from 'react-router-dom'
import './styles/nav.css'

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// MENU DE OPCIONES
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function Nav(){
    return (
        <React.Fragment>
            <nav id='menu'>
                <ul>
                    <li><NavLink to={'/dogs'}>Home</NavLink></li>
                    <li><NavLink to={'/dogs/new'}>Create</NavLink></li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
