
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



const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
		orders: [
			{
			  type: mongoose.Schema.Types.ObjectId,
			  ref: 'Order'
			}
		  ]
		,
		tokens:[
			{
				token:{
				type:String,
				required:true,
			}
		}
		],
	verifytoken:{
		type:String
	}},

	{ collection: 'user-testdata' }
	
)

const model = mongoose.model('user', User)

module.exports = model




