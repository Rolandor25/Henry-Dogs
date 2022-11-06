import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import DogsList from './components/DogsList';
import Dog from './components/Dog';
import Nav from './components/Nav';
import CreateDog from './components/CreateDog'

function App() {
  return (
    <React.Fragment>
      <Route exact path={'/'} component={Landing}/>
      <Route path={'/dogs'} component={Nav}/>
      <Route exact path={'/dogs'} component={DogsList}/>  
      <Route exact path={'/dogs/id/:id'} component={Dog}/> 
      <Route exact path={'/dogs/new'} component={CreateDog}/> 
    </React.Fragment>
  );
}

export default App;
