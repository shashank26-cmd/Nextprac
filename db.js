import mongoose from "mongoose";

const URI= process.env.MONGO_URL
const connectDB=async()=>{
await mongoose.connect(URI,{
    useNewUrlParser:true
});
console.log("db connected......")


}
export default connectDB;