import React from "react";
import { useEffect,useState } from 'react';
import { connect, useDispatch , useSelector} from "react-redux";
import DogsCard from "../components/DogsCard";
import Paged from "../components/Paged";
import SearchBar from '../components/SearchBar';
import { getDogsList,sortbyNameDog,sortbyWeigthDog,filterTempe,getTemper } from '../redux/actions';
import'./styles/layout.css'

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// HOME PAGE - LISTA DE PERROS
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

export function ListDogs(){

    let prevId = 1
    //
    const AllDogs = useSelector((state) => state.AllDogs);
    const Dogs = useSelector((state) => state.Dogs);
    const TemperList = useSelector((state) => state.Temper);

    const [order,setOrder] = useState('');
    const [filteraz,setFilteraz] = useState('');
    const [filterlh,setFilterlh] = useState('');
    const [page, setPage] = useState(1);
    const [pageprev, setPageprev] = useState(1);
    const [pagenext, setPagenext] = useState(2);
    const [dogsPage] = useState(9);
    const totalpage = page * dogsPage;
    const firstdogPage = totalpage - dogsPage;
    const showDogPage = Dogs.slice(firstdogPage, totalpage);
    const paged = function(pageNumber,totpages){
        setPage(pageNumber)
        let currp=parseInt(pageNumber)
        //pag prev y pag next
        if (currp>1 && currp<totpages) {
            setPageprev(currp-1);
            setPagenext(currp+1);
        }
        if (currp===1 && currp<totpages) {
            setPageprev(currp);
            setPagenext(currp+1);
        }   
        if (currp>1 && currp===totpages) {
            setPageprev(currp-1);
            setPagenext(currp);
        }              
    };

    const dispatch = useDispatch();

    //******************** BLOQUE DE ACCIONES ********************/

        //DESPACHO LA ACCION DE BUSCAR TODOS LOS DOGS  Y  TEMPERAMENTOS
        useEffect(() => {
            dispatch(getDogsList())
        }, [dispatch]);

        useEffect(() => {
            dispatch(getTemper())
        }, [dispatch]);

        //ORDENO POR NOMBRE
        function handleSortbyN(e){
            e.preventDefault();
            dispatch(sortbyNameDog(e.target.value))
            setFilteraz(e.target.value)
            setPage(1);
            setOrder(`Order ${e.target.value}`);
        }

        //ORDENO POR PESO
        function handleSortbyW(e){
            e.preventDefault();
            dispatch(sortbyWeigthDog(e.target.value))
            setFilterlh(e.target.value)
            setPage(1);
            setOrder(`Order ${e.target.value}`);
        }  

        //FILTRO POR TEMPERAMENTO
        function handleTempeeFilter(e,oa,ow){
            e.preventDefault();
            dispatch(filterTempe(e.target.value,oa,ow))
            if (oa!=="") dispatch(sortbyNameDog(oa))
            if (ow!=="")dispatch(sortbyWeigthDog(ow))
            setPage(1);
        }

        //DESPACHO LA ACCIONES ONCLICK
        function handleClick(e) {
            e.preventDefault();
            dispatch(getDogsList());
            setPage(1);
        }        

    //******************** RENDERIZADO DEL HOME ********************/
    return(
        <div className="conteiner">
            {/* //HEADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <header className='header'>
            </header>
            {/* //OPTION BAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <div className="filtercontainer">
                <label className="filters"><strong>Sort:</strong></label>
                <select className="select" name="alphabetical" onChange={e => handleSortbyN(e)}>
                    <option defaultValue={'Alphabetical'}></option>
                    <option value="A">Ascending A to Z</option>
                    <option value="Z">Descending Z to A</option>
                </select>
                <label className="filters"><strong>Weigth:</strong></label>
                <select className="select" name="numerical" onChange={e => handleSortbyW(e)}>
                    <option defaultValue={'Score'}></option>
                    <option value="L">From Light to Heavy</option>
                    <option value="H">From Heavy to Light</option>
                </select>
                <label className="filters"><strong>Temperament:</strong></label>
                <select className="select" name="teempe" onChange={e => handleTempeeFilter(e,filteraz,filterlh,pageprev,pagenext)}>
                    <option selected disabled>Please choose...</option>
                    {TemperList.map((t,index) => (
                        <option key={index} id={t.id} value={t.name} >{t.name}</option>
                    ))}
                </select>
                {/* //CARGO COMPONENTE DEL SEARCHBAR */}
                <SearchBar/>
                <button className="searchButton" onClick={handleClick}>Refresh</button>
            </div>
            {/* //BODY >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <main className="conteiner__main">
                {/*<!-- Left sidebar -->*/}
                <aside className="conteiner__left"></aside>
                {/*<!-- Main content -->*/}
                <article ></article>
                    <div className="conteiner__middle">
                        {
                            showDogPage  && showDogPage.map(r=><div key={prevId ++}>
                                {/* LLAMO ALCOMPONENTE QUE RENDERIZA LAS CARDS DE LAS RECETAS */}
                                <DogsCard key={r.id} id={r.id} image={r.image} name={r.name} weight={r.weight} temperament={r.temperament} />
                                <br/>
                            </div>)
                        }
                    </div> 
                { /*<!-- Right sidebar -->*/}
                <aside className="conteiner__right"></aside>
            </main>
            {/* //COMPONENTE DE PAGINADO >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Paged dogsPage={dogsPage} doglist={Dogs.length} paged={paged} pageprev={pageprev} pagenext={pagenext}/>
            {/* //FOOTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <footer>
                <p>© 2022 Rolandor25 - PI Henry Dogs Single Page Aplication</p>
            </footer>
        </div> 
    )
}

function mapStateToProps(state){
    return{
        AllDogs: state.AllDogs,
        Dogs:state.Dogs
    }
}

function mapDispatchToProps(dispatch){
    return{
      getList: dispatch(getDogsList())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ListDogs)