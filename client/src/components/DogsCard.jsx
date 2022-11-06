import React from "react";
import { Link } from "react-router-dom";
import'./styles/layout.css'
//let prevId = 1;
var imgtoshow=""
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// MENU DE OPCIONES
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
export default function DogsCard({id,image,name,weight,temperament}){
  if (!image) {
    imgtoshow='https://img.freepik.com/free-vector/cute-chihuahua-dog-peeking-waving-paw-cartoon-vector-illustration_42750-943.jpg'
  }else{
    imgtoshow=image
  }
  return(
    <div > 
      <div className="content_card">
        <img src={imgtoshow} alt="" />
        <Link to={`/dogs/id/${id}`}> <h3>{name}</h3> </Link>
        <p><strong>Weight: </strong>{weight} Kg</p>
        <p><strong>Temperament:</strong></p>
        <p> {temperament}</p>
      </div>    
    </div>
  )
}