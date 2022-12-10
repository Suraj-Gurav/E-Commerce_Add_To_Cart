import React from 'react';
import './App.css';
import Routing from './Components/Routing';
import {BrowserRouter} from 'react-router-dom' 

const App= ()=>{
  return (
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
   );
}

export default App;
