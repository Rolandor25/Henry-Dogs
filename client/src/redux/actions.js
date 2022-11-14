//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
// ACCIONES DE REDUX
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
import axios from 'axios'

export function getDogsList(){
    return async function (dispatch) {
        return fetch(`http://localhost:3001/dogs`)
        .then(response=>response.json())
        .then(post=>dispatch({type: 'DOGS_LIST', payload: post}))
    }
}

export function getDogsbyName(payload){
    return async function(dispatch) {
        return fetch(`http://localhost:3001/dogs/?name=${payload}`)
        .then(response=>response.json())
        .then(post=>dispatch({type: 'SEARCH_DOGS', payload: post}))
    }
}

export function getDog(id){
    return async function (dispatch) {
        return fetch(`http://localhost:3001/dogs/id/${id}`)
        .then(response=>response.json())
        .then(post=>dispatch({type: 'DOG', payload: post}))
    }
}

export function getTemper(){
    return async function (dispatch) {
        return fetch(`http://localhost:3001/listempe`)
        .then(response=>response.json())
        .then(post=>dispatch({type: 'TEMPER', payload: post}))
    }
}

export function createDog(payload,createmode){
    return async function(dispatch) {
        var response
        try {
            if (createmode===true) {
               response = await axios.post('http://localhost:3001/dogs/new', payload); 
            }else{
               response = await axios.put('http://localhost:3001/dogs/updt', payload); 
            }
            
            return response;
        } catch (error) {
            console.log(error)
        }
    }        
}

export function deleteDog(id) {
    return async function (dispatch) {
        try {
            return await axios.delete(`http://localhost:3001/dogs/del/${id}`);
        } catch (error) {
            console.log(error)
        }
    }
}

export function sortbyNameDog(payload){
    return {
        type: 'SBN',
        payload
    }       
}

export function sortbyWeigthDog(payload){
    return {
        type: 'SBW',
        payload
    }       
}

export function filterTempe(payload){
    return {
        type: 'TEMPFILTER',
        payload
    }       
}
