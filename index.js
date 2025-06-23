const express = require("express");
const cors = require("cors");
const connection= require("./database/connection");

connection();

const app= express();


const port = 3899;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log("El servidor corre!!");
})