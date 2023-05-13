
// const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
// const Image = require("./models/imageModel");
const express=require('express');
const popularProducts = require('./data');
const nodemailer=require("nodemailer")
const cors = require('cors');
const Razorpay = require('razorpay');

var crypto = require("crypto");

// const popularProducts=require('./data/popularProducts')
const app = express();
app.use(cors()); // Add the cors middleware


//email config
// const transporter=nodemailer.createTransport({
// service:"gmail",
// auth:{
// 	user:"sheixkijaan81@gmail.com",
// 	pass:"kpvciqvijbijibpb"
	
// }


// })



app.get('/',(req,res)=>{

    res.send('api is running')
})

const userRoutes=require("./routes/route")
app.use("/api",userRoutes);

// app.get('/api/products',(req,res)=>{

//   res.json(popularProducts)
// })



app.get('/api/products/:id',(req,res)=>{
    const value=parseInt(req.params.id);
// const product=popularProducts.find((p)=>p._id=== value
// )

const result = popularProducts.find((element) => element.id === value);

console.log(result)
res.json(result)

})


//payment integ
const PAYFAST_MERCHANT_ID = '10029311';
const PAYFAST_MERCHANT_KEY = 'fucad3eashsey';
app.post('/api/payfasthere', (req, res) => {

    console.log("backend inside paymment")
  const { name, email, amount } = req.body;
console.log(req.body)
//   const params = new URLSearchParams();
//   params.append('merchant_id', PAYFAST_MERCHANT_ID);
//   params.append('merchant_key', PAYFAST_MERCHANT_KEY);
//   params.append('return_url', 'http://localhost:3000/payment/success');
//   params.append('cancel_url', 'http://localhost:3000/payment/cancel');
//   params.append('notify_url', 'http://localhost:5000/api/payment/payfast/notify');
//   params.append('name_first', name);
//   params.append('email_address', email);
//   params.append('amount', amount);
//   params.append('item_name', 'My Product');
//   params.append('item_description', 'Product Description');

//   console.log(params)
//   const signature = crypto
//     .createHash('md5')
//     .update(`${params.toString()}&passphrase=YOUR_PASSPHRASE`) // Replace with your own passphrase
//     .digest('hex');

//   params.append('signature', signature);

//   res.redirect(`https://www.payfast.co.za/eng/process?${params.toString()}`);






const params = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel',
    notify_url: 'http://localhost:5000/api/payfast/notify',
    name_first: 'John',
    name_last: 'Doe',
    email_address: 'john.doe@example.com',
    cell_number: '0812345678',
    amount: 100,
    item_name: 'Test Item',
  };

  console.log('PayFast params:', params); // Add console log statement

  res.redirect(`https://www.payfast.co.za/eng/process?${params.toString()}`);





});





//test razopay




const RAZOPAY_API_KEY="rzp_test_2GxqDmcuBrVXNy"
const RAZOPAY_API_SECRET="u9H1y6JTbhTQ0wJeiGqFOKzT"



 const instance=new Razorpay({

key_id:RAZOPAY_API_KEY,
key_secret:RAZOPAY_API_SECRET
})



 const checkout=async(req,res)=>{

	console.log("checkout backend "+req.body.firstName)
	const advanceDeposit=(req.body.price/2)

	const remainingAmount=(req.body.price-advanceDeposit)
	const options = {
	  amount: req.body.price,  // amount in the smallest currency unit
	  currency: "INR",
	};
	const order=await instance.orders.create(options, async function(err, order) {
	  
	  const paymentReferenceId=order.id
	//   console.log("payment id is "+paymentReferenceId)





//lets try

    console.log("inside orders")
    const userId = req.body.orderid
    console.log("user id is "+userId)
    const orderHere=await Order.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        contactOrEmail: req.body.contactOrEmail,
        address: req.body.address,
        city: req.body.city,
        phoneNum: req.body.phoneNum,
        price:req.body.price,
		paymentId:paymentReferenceId,
       _id:userId,
        advanceDeposit:advanceDeposit,
		remainingAmount:remainingAmount

        // user: userId, // save the order with the user's ID
    })
    orderHere.save((err) => {
    if (err) {return console.log(err);}
    else {
        console.log("data saved " )
		return res.status(200).json({ orderHere, order });
	}
        // return res.status(200).json(orderHere,order);}
    
    }
    );
    
    }
	)

// console.log(order)

// 	  res.status(200).json({
// 		success:true,
// 		order
// 	  })
	// });


}



const paymentVerificationhere=async(req,res)=>{
	console.log("verification sartart")
	// const razorpay_payment_id = req.query.razorpay_payment_id;
	// const {
	// 	razorpay_order_id,
	// 	razorpay_payment_id,
	// 	razorpay_signature,
	// 	notes // get notes object from req.body
	//   } = req.body;
	
	//   console.log(req.body);
const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
// console.log(req.body)
const body=razorpay_order_id + "|" + razorpay_payment_id;

var expectedSignature = crypto.createHmac('sha256', RAZOPAY_API_SECRET)
								.update(body.toString())
								.digest('hex');
								console.log("sig received " ,razorpay_signature);
								console.log("sig generated " ,expectedSignature);


								console.log(expectedSignature)
								console.log(razorpay_signature)
	const isAuthentic=expectedSignature===razorpay_signature
	if(isAuthentic){
res.status(200).json({
	success:true,
	message:"thnks"
})


	}						
	
	else{
		res.redirect('http://localhost:3000/');

		// res.status(200).json({
		// 	success:true,
		// 	redirectUrl:'http://localhost:3000'

		//   })
	}
	  
	


}

app.post("/api/paymentverification",paymentVerificationhere)

app.get("/api/getKey",(req,res)=>{
console.log("inside key veri")
res.status(200).json({key:RAZOPAY_API_KEY})


})




app.post('/api/checkoutRazor',checkout)
console.log("razor checkout")
// app.listen(5000,console.log('server is running'))




// const express=require('express');
const connectDatabase=require("./config/database")
const bcrypt=require('bcryptjs')
// const app=express();
// const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")

//image upload 
// const multer=require('multer')
// const path=require('path')




// const cors=require('cors');
// app.use(cors())


const User=require('./models/userModel')
const Order=require('./models/orderModel')
 const CustomShoe=require('./models/customOrderModel')
 const Image = require("./models/imageModel");

const dotenv=require('dotenv')

app.use(express.json())

// //config

dotenv.config({ path: "backend/config/config.env" })

//connect to database

connectDatabase()


// const popularProducts = require('./data');
// // const popularProducts=require('./data/popularProducts')


// app.get('/',(req,res)=>{

//     res.send('api is running')
// })


// //register usr

// app.post('/api/register', async(req,res)=>{
//    console.log(req.body)

//   const newPassword = await bcrypt.hash(req.body.password, 10)
// 		const newUser=await User.create({
// 	 		name: req.body.name,
// 	 		email: req.body.email,
// 	 		password: newPassword,
// 	 	})
	
			
// newUser.save((err) => {
//   if (err) {return console.log(err);}
//   else {
// 	console.log("data saved from register")
// 				return res.status(200).json(newUser);}
  
// });

// })



// login to database

// app.post('/api/login', async (req, res) => {

// console.log("login request")
//   console.log(req.body.email)
//   console.log(req.body.password)
//   const { email, password } = req.body;

// 	const user = await User.findOne({
		
// 		email,
		
// 	})
// 	console.log("user is " + user)
	
// 	if (!user) {
// 		console.log("invalid email")
// 		return res.status(404).json({ error: 'User not found' });	
// 	}

// 	const isPasswordValid = await bcrypt.compare(
// 		req.body.password,
// 		user.password
// 	)

// 	console.log("password valid is "+isPasswordValid)

// 	if (isPasswordValid) {
// 		console.log("inside valid password")
// 		console.log(user.password)
// 		console.log(req.body.password)
// 		const token = jwt.sign(
// 			{
// 				name: user.name,
// 				email: user.email,
// 			},
// 			'secret123'

// 		)

// 		return res.json({ status: 200, user: token })
// 	} else {
// 		console.log("inside invalid password")
// 		res.status(401).json({status:401,error})	
// }
// })

//send email link for reset password

// app.post("/api/sendpasswordlink",async(req,res)=>{

// // console.log(req.body)

// const {email}=req.body;
// if(!email)
// {
// 	res.status(401).json({
// 		status:401,message:"Enter your email"
// 	})
// }

// try{
// 	const userfind = await User.findOne({
// 		// email: req.body.email,
// 		// password:req.body.password
// 		email:email
// 	})

// 	// console.log("userfind ",userfind)
   
// 	const token=jwt.sign({_id:userfind._id},
// 	'secret123',{
// 		expiresIn:"1d"

// 	})
// //   console.log(token)

//  const setusertoken=await User.findByIdAndUpdate(
// 	{
// 	_id:userfind._id	
// 	},{
// 		verifytoken:token
// 	},
// 	{
// 		new:true
// 	}
//  )


//  if(setusertoken){
// console.log("inside set user")
//  const mailOptions={
// 	from:"sheixkijaan81@gmail.com",
// 	to:email,
// 	subject:"Sending email for password reset",
// 	text:`This link valid for 2 minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
//  }
// console.log(mailOptions)
// transporter.sendMail(mailOptions,(error,info)=>{
// if(error) {
// 	console.log("error",error);
// 	res.status(401).json({
// 		status:401,message:"email not found"
// 	}	)  }
// else{
// 	console.log("Email sent ",info.response);
// 	res.status(200).json({status:200,message:"email sent success"})
// } }) } }
// catch(error){
// 	res.status(401).json({
// 		status:401,message:"invaliduser"
// 	} ) }
// })



// verify user for forgot password
// app.get("/forgotpassword/:id/:token",async(req,res)=>{

// console.log("verify user here")
// // console.log(req.params)

// const {id,token}=req.params;
// // console.log(id)
// // console.log(token)
// try{
// 	const validuser=await User.findOne({


// 		_id:id,
// 		verifytoken:token

// 	})

//   const verifyToken=jwt.verify(token,'secret123')
// console.log("verify token "+verifyToken)
//    if(validuser && verifyToken._id){
  
// res.status(200).json({status:200,validuser})

//    }
// else{
// 	res.status(401).json({status:401,message:"user does not exist"})

// }
// }
// catch(error) {

// console.log("error is "+error)

// res.status(401).json({status:401,error})

// }


// })



// changing password

// app.post("/api/:id/:token",async(req,res)=>{

// 	console.log("lets change password")
// 	const {id,token}=req.params;
// 	const {password}=req.body;

//    try{
// 	const validuser=await User.findOne({


// 		_id:id,
// 		verifytoken:token

// 	})

//   const verifyToken=jwt.verify(token,'secret123')
// console.log("verify token "+verifyToken)
//    if(validuser && verifyToken._id){ 

//  const newpassword=await bcrypt.hash(password,12)

//  const setnewuserpass=await User.findByIdAndUpdate({

// _id:id,


//  },
//  {
// 	password:newpassword
//  }
 
//  )

// setnewuserpass.save();
// res.status(200).json({status:200,message:setnewuserpass})




//    }

// else{
// 	res.status(401).json({status:401,message:"user does not exist"})

// }
//    }
// catch (error){
// 	console.log("error is "+error)

// 	res.status(401).json({status:401,error})
	
// }



// })










// // order
// app.post('/api/orders',async (req,res)=>{
// console.log(req.body)
// console.log("inside orders")
// const orderHere=await Order.create({
// 	firstName: req.body.firstName,
// 	lastName: req.body.lastName,
// 	contactNumber: req.body.contactNumber,
// 	contactOrEmail: req.body.contactOrEmail,
// 	address: req.body.address,
// 	city: req.body.city,
// 	phoneNum: req.body.phoneNum,
//     price:req.body.price,
// 	user: req._id
// })
// console.log(user)
// orderHere.save((err) => {
// if (err) {return console.log(err);}
// else {
// 	console.log("data saved")
// 	return res.status(200).json(orderHere);}

// }
// );

// })


// //setup multer for handling file uploads


// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 	  cb(null, "uploads");
// 	},
// 	filename: function (req, file, cb) {
// 	  cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
// 	},
//   });
  
//   const upload = multer({ storage });


app.post('/api/customshoe', async (req,res)=>{

console.log(req.body)
const customOrderHere=await CustomShoe.create({
	categoryOfShoe:req.body.selectedCategory,
	upperShoe:req.body.selectedUpper,
	bottomSoleShoe:req.body.selectedSole,
	colorShoe:req.body.selectedColor,
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	contactNumber: req.body.contactNumber,
	contactOrEmail: req.body.contactOrEmail,
	address: req.body.address,
	city: req.body.city,
	phoneNum: req.body.phoneNum,
	path:req.body.formData
})
// const image1 = new Image({ path: req.file.path });
// image1.save((err) => {
//   if (err) {
// 	console.log(err);
// 	res.sendStatus(500);
//   } else {
// 	res.sendStatus(200);
//   }
// });

customOrderHere.save((err) => {
	if (err) {return console.log(err);}
	else {
		console.log("data saved")
		return res.status(200).json(customOrderHere);}
	
	}
);
});

// customOrderHere.save((err) => {
// 	if (err) {return console.log(err);}
// 	else {
// 		console.log("data saved")
// 		return res.status(200).json(customOrderHere);}
	
// 	}
// );




// // try upload image


// // app.post("/api/upload", upload.single("image"), async (req, res) => {
// // 	const imagePath = req.file.path;
  
// // 	console.log(imagePath)
// // 	const image = new Image({
// // 	  image: imagePath,
// // 	});
  
// // 	await image.save();
// //   s
// // 	res.status(200).send("Image uploaded successfully");
// //   });






//   // Endpoint for receiving image upload
// //   app.post("/upload", upload.single("image"), (req, res) => {
// // 	const image = new Image({ path: req.file.path });
// // 	image.save((err) => {
// // 	  if (err) {
// // 		console.log(err);
// // 		res.sendStatus(500);
// // 	  } else {
// // 		res.sendStatus(200);
// // 	  }
// // 	});
// //   });


// // const orderHere=new Order({

// // fullname:req.body.fullname,
// // contactNumber:req.body.contactNumber,
// // // price:req.body.totalPrice,



// // })
// // orderHere.save((error) => {
// //     if (error) {
// //       res.status(500).send(error);
// //     } else {
// //       res.send(order);
// //     }
// //   });



// })



const multer = require('multer');
const shell = require('shelljs');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	let destination = path.join(__dirname, '../uploads'); // ./uploads/

	const id = uuidv4();
	console.log(id)
    shell.mkdir('-p', './uploads/' + id);
    destination = path.join(destination, '', id); // ./uploads/files/generated-uuid-here/
    console.log('dest', destination)



    cb(null, destination)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
  
})

const upload = multer({ storage: storage })


app.post('/api/uploadimage',upload.single('image'),async (req, res) => {
	console.log("backend request image")
	console.log(req.body)
	const {category,upper,sole,color,firstname,lastname,email,address,city,phonenum,price}=req.body;
//
	const photo = req.file.filename;
    console.log(photo)
    const orderId = uuidv4();

	const customOrderHere=await CustomShoe.create({
     categoryOfShoe:category,
	  upperShoe:upper,
	  bottomSoleShoe:sole,
	  colorShoe:color,
	  firstName:firstname,
	  lastName:lastname,
	  contactOrEmail:email,
	  address:address,
	  city:city,
	  phoneNum:phonenum,
	  path:photo,
	  dynamicPric:price

	})
	console.log(customOrderHere)
customOrderHere.save((err)=>{
	if (err) {return console.log(err);}
    else {

		return res.status(200).json(customOrderHere);}

})

	// res.send('Image uploaded successfully')
  })
  


//build
app.use(express.static(path.join(__dirname, '../../frontenddemo/build')));


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../frontenddemo/build/index.html'));
  });

  
  

app.listen(5000,console.log('server is running'))










