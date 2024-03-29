import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsbyName } from '../redux/actions';
import './styles/searchbar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleChange(e) {    
        e.preventDefault();    
        setInput(e.target.value);
    };

    function handleSubmit(e) {
        try {
            dispatch(getDogsbyName(input));
            
        } catch (error) {            
            return error;
        }
        setInput('')
    };

    return (
        <div className="search">
            <input className="searchtext" type="text"  placeholder="Search Dogs By Name" value={input} onChange={e => handleChange(e)}/>
            <button className="searchButton" type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )

};