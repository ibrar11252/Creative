
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectDB=async()=>{

try{
const conn=await mongoose.connect(process.env.MONGO_URL,{


    useUnifiedTopology:true,
    useNewUrlParser:true,
   
})

console.log(`monogodb connnected : ${conn.connection.host}`)



}
catch(error){

console.log(`error : ${error.message} and env is ${process.env.PORT}` )
process.exit(1)

}

}
module.exports=connectDB

