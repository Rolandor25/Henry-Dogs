import React from "react";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from 'react'
import { createDog } from "../redux/actions";
import { useDispatch,useSelector } from 'react-redux'
import { getTemper } from '../redux/actions';
import'./styles/layout.css'

//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW
// FORMULARIO DE CREACION DE RECCETA
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWWMWWMWMWMW

//VALIDACIONES DEL FORMULARIO
function FormErr(input) {
    let errors = {};
    if (!input.name) errors.name = 'Please enter a Dog race';
    if (!input.weight) errors.weight = 'Please enter a Dog Weight';
    if (!input.height) errors.height = 'Please enter Dog Height';
    if (!input.life_span) errors.life_span = 'Please enter Dog Life Span';
    if (!/(^http[s]?:\/{2})|(^www)|(^\/{1,2})/.test(input.image)) errors.image = 'Please indicate a valid url of the image';
    if (input.temperament.length<1) errors.temperament = 'Please select at least one temperament';
    return errors;
}

export default function CreateDog(){
    // SETEO ESTADOS INIIALES DE COMPONENTES DEL FORMULARIO
    const [errors, setErrors] = useState({})
    let okMsg;
    const dispatch = useDispatch();
    const history=useHistory()
    const TemperList = useSelector((state) => state.Temper);

    //DESPACHO LA ACCION DE BUSCAR TODOS LOS TEMPERAMENTOS
    useEffect(() => {
        dispatch(getTemper())
    }, [dispatch]);  

    //VALIDACION DE MODO DE TRABAJO / CREACION O MODIFICACION
    let paquete
    let image,name,weight,height,life_span,temperament
        okMsg='New recipe added successfully!'
        name='';
        image='';
        height='';
        weight='';
        life_span='';
        temperament=[];
        paquete={name:name,image:image,height:height,weight:weight,life_span:life_span,temperament:temperament}  
    let[input,setInput]=useState(paquete);

    //MANEJADOR DE EVENTOS DE CAMBIO EN CAMPOS IMPUTS
    let handleChange=(event)=>{
        event.preventDefault();
        setInput((prev) => {   
            const DogCreated = {...prev,[event.target.name]: event.target.value}
            const validations = FormErr(DogCreated);
            setErrors(validations)
            return DogCreated
        });
    }

    //MANEJADOR DE EVENTOS DE LISTBOX
    let handleList = (event) => {
        if (event.target.value!=='Please choose...'){
            let tempes=[]
            tempes=input.temperament.concat(event.target.value)
            setInput({
                ...input,
                temperament:tempes
            });
            const validations = FormErr(input);
            setErrors(validations)          
        }
    };

    //MANEJADOR DE SUBMIT DEL FORM
    function handlesubmit(event){
        event.preventDefault()
        if (input.name === '' && 
           input.weight === '' && 
           input.temperament.length<1) {
           alert("you must complete the required fields to be able to save the dog");}
       else {    
            let PAC
            PAC={name:input.name, weight:input.weight, height:input.height, image:input.image, life_span:input.life_span, temperament:input.temperament}
            dispatch(createDog(PAC))
            setInput({name:'',weight:'',height:'',life_span:'',image:'',temperament:[]})//Limpio el Form despues de guardar   
            alert(okMsg) 
            history.push('/dogs');  
        }
    }

     // LIMPIO FORMULARIO EN EL RESET
    function handlereset(event){
        event.preventDefault()
        setInput({name:'',weight:'',height:'',life_span:'',image:'',temperament:[]})//Limpio el Form despues de guardar
    }

    //FORMULARIO
    return(
        <div className="conteiner">
            <header className='header'>
            </header>

            <main className="conteiner__main">
                {/*<!-- Left sidebar -->*/}
                <aside className="conteiner__left"></aside>
        
                {/*<!-- Main content -->*/}
                <article className="conteiner__middle_f">
                    
                    <React.Fragment>
                        <form onSubmit={event=>handlesubmit(event)}>
                            <h1 className='conteiner_tittleform' align="center">Lets Create a New Furry Friend</h1> 

                            <table id="table1" cellSpacing="5px" cellPadding="5%" align="center"> 
                                <tr>
                                    <td align="right"><strong>Dog Name:</strong></td>
                                    <td><input type={'text'} name={'name'}  value={input.name} onChange={(event)=>handleChange(event)}/>
                                    <div></div>
                                    {errors.name && (
                                        <span className="errors">{errors.name}</span>
                                    )}                                    
                                    </td>
                                </tr>

                                <tr>
                                    <td align="right"><strong>Weigth: </strong></td>
                                    <td><input type={'text'} name={'weight'}  value={input.weight} onChange={(event)=>handleChange(event)}/>
                                    <div></div>
                                    {errors.weight && (
                                        <span className="errors">{errors.weight}</span>
                                    )}                                     
                                     </td>                                     
                                </tr>

                                <tr>
                                    <td align="right"><strong>Heigth: </strong></td>
                                    <td><input type={'text'} name={'height'}  value={input.height} onChange={(event)=>handleChange(event)}/>
                                    <div></div>
                                    {errors.height && (
                                        <span className="errors">{errors.height}</span>
                                    )}                                     
                                     </td>                                     
                                </tr>

                                <tr>
                                    <td align="right"><strong>Live Span: </strong></td>
                                    <td><input type={'text'} name={'life_span'}  value={input.life_span} onChange={(event)=>handleChange(event)}></input>
                                    <div></div>
                                    {errors.life_span && (
                                        <span className="errors">{errors.life_span}</span>
                                    )}                                     
                                     </td>                                     
                                </tr>

                                <tr>
                                    <td align="right"><strong>URL Reference Image:</strong></td>
                                    <td><input type={'text'} name={'image'}  value={input.image} onChange={(event)=>handleChange(event)}/>
                                    <div></div>
                                    {errors.image && (
                                        <span className="errors">{errors.image}</span>
                                    )}    
                                    </td>
                                </tr>

                                <tr>
                                    <td align="right"><strong>Temperaments:</strong></td>
                                    <td>
                                        <select name={'temp1'} onClick={handleList}> 
                                            <option selected disabled>Please choose...</option>
                                            {TemperList.map((t,index) => (
                                                <option key={index} id={t.id} value={t.name} >{t.name}</option>
                                            ))}
                                        </select>
                                        <div></div>

                                        <select name={'temp2'} onClick={handleList}>
                                            <option selected disabled>Please choose...</option>
                                            {TemperList.map((t,index) => (
                                                <option key={index} id={t.id} value={t.name} onChange={handleList}>{t.name}</option>
                                            ))}
                                        </select>
                                        <div></div>

                                        <select name={'temp3'} onClick={handleList}>
                                            <option selected disabled>Please choose...</option>
                                            {TemperList.map((t,index) => (
                                                <option key={index} id={t.id} value={t.name} onSelect={handleList}>{t.name}</option>
                                            ))}
                                        </select>
                                        <div></div>     

                                        <select name={'temp4'} onClick={handleList}>
                                            <option selected disabled>Please choose...</option>
                                            {TemperList.map((t,index) => (
                                                <option key={index} id={t.id} value={t.name}>{t.name}</option>
                                            ))}
                                        </select>
                                        <div></div>  

                                        {errors.temperament&& (
                                        <span className="errors">{errors.temperament}</span>
                                    )}                                                                                                                                                                                                  
                                    </td>
                                </tr>  

                                {/* BOTONES DEL FORMULARIO */}
                                <tr>
                                    <td align="right" ><strong>Form Options:</strong></td>
                                    <td><input type={'submit'} value={'Create'}/>                                                             
                                    <input type={'reset'}  value={'Reset'} onClick={handlereset}/></td>                          
                                </tr> 
                            </table>
                        </form>
                    </React.Fragment>
        
                </article>
        
                {/*<!-- Right sidebar -->*/}
                <aside className="conteiner__right"></aside>
            </main>
            <footer>

            </footer>
        </div> 

    )
}