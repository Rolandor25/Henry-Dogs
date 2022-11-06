import React from "react"
import { Link } from "react-router-dom";
import './styles/Button.css'

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// LANDING PAGE
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function IniButon() {
    return(
        <React.Fragment>  
        <div id="clearfix">
            <div id="box">
            <p></p>
            <p></p>
            </div>

            <div id="box">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>   
                <br/>
                <div >
                    <div id="inibox"> 
                        <div id='tittlefont'>HenryDogs!</div>
                        <br/>
                        <div id='introfont'>Joint us and Share Your Love for Furry Friends with The World!</div>
                        <br/>   
                        <div>
                            <Link to='/dogs'>
                                <button className="searchButton" id='Button'>Wof Yea!</button>
                            </Link>                         
                        </div>      
                    </div>
                    <br/>
                </div>
            </div>

            <div id="box">
            <p></p>
            </div>

            <div id="box">
            <p></p>
            </div>

            <div id="box">
            <p></p>
            </div>             
        </div>
        </React.Fragment>
    )
}

