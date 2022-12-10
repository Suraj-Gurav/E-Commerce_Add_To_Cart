
const express = require("express");
const app = express();
const PORT =3001;
const cors=require("cors");
app.use(cors());
app.use(express.json());
const conn = require("./db");

conn.connection.on("connected",(err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected To Mongodb");
    }
});

app.use("/product",require("./Router/Product"));
app.listen(PORT,() => {
    console.log("Server Conteccted");
});