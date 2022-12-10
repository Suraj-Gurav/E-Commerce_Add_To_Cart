const express=require("express");
const route=express.Router();

route.post("/",require("./../Controller/Product").addProduct);
route.get("/",require("./../Controller/Product").allProduct);
route.delete("/:id",require("./../Controller/Product").deleteProduct);

module.exports=route;
