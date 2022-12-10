import React from 'react';
import {Routes,Route} from "react-router-dom"
import AddCart from './AddCart';
import Navbar from './Navbar';

const Routing=()=>{
return(
    <>
        <Routes>
            <Route exact path="/" element={<Navbar/>}/>
            <Route exact path="/addcart" element={<AddCart/>}/>
        </Routes>
 
    </>
)
}
export default Routing;