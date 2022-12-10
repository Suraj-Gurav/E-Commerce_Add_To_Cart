import React, { useEffect, useState } from "react";
import axios from "axios"
import "./Navbar.css"
import {useNavigate} from 'react-router-dom';
import {FcShipped} from "react-icons/fc";

const Navbar = () => {
    const [getProduct, setGetProduct] = useState([]);
    const [category, setCategory] = useState("All");
    const [data, setData] = useState([])
    const [cartCount,setCartCount]=useState([]);
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    // -------get all categary API-----
    useEffect(() => {
        productList();
    }, []);

    const productList = () =>{
        axios.get("https://fakestoreapi.com/products/categories")
            .then(async (res) => {
                const data = await res.data;
                setGetProduct(data);
                //console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

     // -------get all Products API-----
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(async (res) => {
                const data = await res.data;
                setData(data);
                // console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        addToCart();
    }, []);

    const addToCart=()=>{
        axios.get("http://localhost:3001/product")
            .then(async (res) => {
                const data = await res.data;
                setCartCount(data);
             // console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    //Send Data to Backend using Post API
    const AddtoCart = async (id, price, title, image) => {
        const dataObj = {
            id: id,
            title: title,
            price: price,
            image: image        
        }
        await axios.post("http://localhost:3001/product", dataObj)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            addToCart();
        }

    //Filter categary function
    const filterData = data.filter((row) => {
            if (category === "All") {
                return (row)
            } else {
                return (row.category === category)
            }
        })

    
    //search product by price function
    const searchProduct = filterData.filter((row) =>{
                return (row.price === search)
            })
           
    return(
        <div className="container">
            {/* ----------Navbar Section Start --------*/}
            <div className="navBar">
                <ul>
                    <li><h1>AddToCard</h1></li>
                    <li>Home</li>
                    <li>About</li>
                    <li>
                        <select className="search" onChange={(e) => setCategory(e.target.value)}>
                        <option value='All'>All</option>
                            {
                               getProduct.map((row) => {
                                return(
                                    <>
                                        <option value={row}>{row}</option> 
                                    </>
                                )
                               }) 
                            } 
                        </select>
                    </li>
                    {/*---------------- Search button ---------------*/}
                    <li className="btnSearch"><input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Product" />
                    <button className="p-2" onClick={()=>{searchProduct()}}>Search</button></li>
                     {/*---------------- Search button ---------------*/}
                </ul>
                <div className="cardBtn">
                    <button className="button" onClick={() => navigate("/addcart")}><FcShipped/> Cart <span className="count">{cartCount.length}</span></button>
                </div>
            </div>
            {/* --------- Discription box Start---------- */}
            <div className="shop">
                <h2>Shop in style</h2>
                <p>with this shop homepage template</p>   
            </div>

         {/* ---------box-cart Start---------- */}                   
            <div className="grid">
            {
         filterData.map((row) => {
           
        return (
            <div  className="card">
                <img src={row.image} alt="e-commerce" />
                <h5 className="title">{row.title.substring(0,30)}</h5>
                <p className="price">${row.price}</p>
                <button className="btn"  onClick={() =>AddtoCart(row.id, row.price, row.title, row.image)}>Add To Cart</button>
            </div>
        )
        })
    }
    </div>   
    </div>    
)}

export default Navbar;