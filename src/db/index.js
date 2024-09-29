import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB =async ()=>{
    try
    {
      const connectioninstant= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`Database connecte !! host ${connectioninstant.connection.host}`);
    }
    catch(error)
    {
       console.log("ERROR : ",error);
       process.exit(1);
    }
   
}
export default  connectDB;