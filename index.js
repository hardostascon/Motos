const express = require("express");
const cors = require("cors");
const connection= require("./database/connection");

connection();

const app= express();


const port = 3899;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const userRoutes= require("./routes/user");

app.use("/api/user",userRoutes);

app.get("/pruebitas",(req,res)=>{
   return res.status(200).json({
       "Titulo" :"Patos Criollos",
       "Descripcion" : "Historia de los Muscovy Ducks"
   })
});

app.listen(port,()=>{
    console.log("El servidor corre!!");
});

