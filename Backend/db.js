const mongoose=require('mongoose');
const mongoURI="mongodb://0.0.0.0:27017/Notes";
const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected to mongo successfully");
}
module.exports=connectToMongo;