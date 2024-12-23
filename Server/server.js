const express = require("express");
const mysql = require('mysql')
import cookieParser from 'cookie-parser';
import initRoutes from './routes/web';
const cors= require('cors')
const bodyParser=require('body-parser')
var multer = require('multer');
var upload = multer();
require("dotenv").config()
require("./config/connection_database")

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())

app.use(upload.array()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.urlencoded({limit: '50mb', extended: true })); 

// app.use(cors());
app.use(
    cors({
       origin: process.env.CLIENT_URL,
       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );

initRoutes(app);


const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{
    console.log('Server started on port : http://127.0.0.1:'+ PORT)
})
