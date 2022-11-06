import { useEffect } from 'react';
import { useSelector ,useDispatch } from "react-redux";
import { getDog } from '../redux/actions'


//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// DETALLE DE PERRO
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export default function DogDetail(props){
  let dispatch=useDispatch()
  let id_detail= props.match.params.id
  let imgtoshow="https://img.freepik.com/free-vector/cute-chihuahua-dog-peeking-waving-paw-cartoon-vector-illustration_42750-943.jpg"

  //SE CAPTURA LA INFORMACION DEL PERRO
  useEffect(() => {
    dispatch(getDog(id_detail))
  }, [dispatch, id_detail]);

  //ASIGNO A DOG EL DETALLE PASSSADO POR EL BACK
  const Dog = useSelector(state => state.Dog);

  //SE MUESTRA UNA IMAGEN POR DEFECTO
//******************** RENDERIZADO DEL DETALLE ********************/
  return(
    <div className="conteiner">
      {/* //HEADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <header className='header'>
      </header>      
      {/* //BODY >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */} 
      <main className="conteiner__main">
        {/*<!-- Left sidebar -->*/}
        <aside className="conteiner__left"></aside>
        {/*<!-- Main content -->*/}
        <article></article>
          <div className="conteiner__middle_h">
              {
                 Dog.length? ( 
                 <div className="content_card_d">
                    <h1 className='detTittle'>{Dog[0].name}</h1>
                    {/* // CONTENIDO DE COL IZQUIERDA  */}
                    <div className='conteiner__colLft'>
                      <img src={Dog[0].image} alt={imgtoshow} height="400" width="440"/>
                    </div>
                    {/* // CONTENIDO DE COL DERECHA  */}
                    <div className='conteiner__colRgt'>
                      <h2>Weight: </h2>{Dog[0].weight} Kg
                      <h2>Height: </h2>{Dog[0].height} Cm
                      <h2>Life Span: </h2>{Dog[0].life_span} 
                      <h2>Temperaments:</h2>
                      <h3> {Dog[0].temperament}</h3>
                    </div>
                  </div>):null
              }
          </div> 
        { /*<!-- Right sidebar -->*/}
        <aside className="conteiner__right"></aside>
      </main>
      {/* //FOOTER>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <footer>
        <p>© 2022 Rolandor25 - PI Henry Dogs Single Page Aplication</p>
      </footer>
  </div> 
  )
}
