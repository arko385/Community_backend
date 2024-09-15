import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
connectDB()
.then(()=>{
    app.listen(process.env.PORT||7000,()=>{
        console.log(`The app is running on Port : ${process.env.PORT}`);
    })
    
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ",err)
});



app.get('/', (req, res) => {
    res.send('Hello World!')
    })