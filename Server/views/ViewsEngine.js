import express from "express";

let configViewEngine=(app)=>{
    app.use(express.static("./public"));
    app.set("view engine","ejs")
}