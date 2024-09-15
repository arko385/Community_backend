import express from "express";
import cookieParser from "cookie-parser";
import  cors  from "cors";
const app=express();


// app.use this are basically middlewares 
//Configuration
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// Apply the JSON body parser middleware with a limit of 16kb 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export default app;