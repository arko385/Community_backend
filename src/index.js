import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRoutes  from'./routes/auth.js';
dotenv.config();


app.use(express.json());
connectDB()
.then(()=>{
    app.listen(process.env.PORT||7000,()=>{
        console.log(`The app is running on the Port : ${process.env.PORT}`);
    })
    
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ",err)
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
    })