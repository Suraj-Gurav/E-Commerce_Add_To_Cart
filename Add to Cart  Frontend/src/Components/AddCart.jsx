import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./AddCart.css"
import {Link,useNavigate } from 'react-router-dom'
import { AiFillMinusCircle,AiFillPlusCircle} from "react-icons/ai";
import { FcEmptyTrash } from "react-icons/fc";
import {FcShipped} from "react-icons/fc";

const AddCart = () => {

    const [countity, setCountity] = useState(1);
    const [data, setData] = useState([])
    const navigate = useNavigate();

   //get product to Backend
   useEffect(() => {
       axios.get("http://localhost:3001/product")
           .then(async (res) => {
               const data = await res.data;
               setData(data);
            // console.log(data)
           })
           .catch((err) => {
               console.log(err);
           })
   }, []);

   //delete API call
   const DeleteProduct = async (id) => {
       axios.delete(`http://localhost:3001/product/${id}`)
           .then((res) => {
               alert("Succesfully Deleted")
           })
           .catch((err) => {
               alert(err);
           })
       window.location.reload()
   }
   //countity increase and decrease function 
   const decrease=()=>{
    countity > 1 ? setCountity(countity-1):setCountity(1)
   }
   const increase=()=>{
    countity < 20 ? setCountity(countity+1):setCountity(1)
   }
   let Total;
    return (
        <>
        {/* --------------Navbar -------------- */}
            <div className="navBar">
                <ul>
                    <li><h1>AddToCard</h1></li>
                    <li onClick={() => navigate("/")}>Home</li>
                    <li>About</li>                
                </ul>
                <div className="cardBtn">
                    <button className="button"><FcShipped/> Cart <span className="count">{data.length}</span></button>
                </div>
            </div>
         {/* --------------page section -------------- */}
        <div className="container1">
            <div className="border">
                <h2>SHOPPING BAG</h2>
                <p>{data.length} items</p>
            </div>
            <div className="grid2 border">

                <div>PRODUCTS</div>
                <div>PRICE</div>
                <div>QUANTITY</div>
                <div>TOTAL</div>
                <div>Remove</div>         
                    {
                        data.map((row) => {
                        // --------calculation tax and total product price------------
                       
                        const percentage = (Number(row.price)) * (12 / 100);
                        const PriceTax = Math.round(percentage)
                         Total = Number(PriceTax) + Number(row.price)*countity
                            return (
                                <>
                                <div className="flex margin">
                                    <div>
                                        <img className="cartImg" src={row.image} alt="product" />
                                    </div>
                                    
                                    <div className="m-top">
                                        <h4 className="margin1">{row.title.substring(0,50)}</h4>
                                        <p className="margin1">Art No :A895RV59</p>
                                        <p className="margin1">Color : White</p>
                                        <p className="margin1">Size: M</p>
                                    </div>
                                </div>

                            <div><p>{row.price}</p></div>
                            <div><AiFillMinusCircle onClick={()=>decrease()}/> {countity} <AiFillPlusCircle onClick={()=>increase()}/></div>
                             <div>{Total}</div>
                            <FcEmptyTrash className="size" onClick={() => DeleteProduct(row._id)}/>
                            </>
                            )
                        })
                    }
                    </div>
                    <div className="flex center margin">
                <Link exact to="/"><button className="primaryBtn">Go Back</button></Link>
                <h4>SUBTOTAL : {Total}</h4>
                <button className="primaryBtn">CONTINUE</button>
            </div>
        </div>
    </>  
)}

export default AddCart;