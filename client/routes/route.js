const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs')

const popularProducts = require('../data');
const User=require('../models/userModel')
const Order=require('../models/orderModel')
const cors=require('cors');
router.use(cors())
router.use(express.json());
const jwt=require("jsonwebtoken")

const crypto = require('crypto');
const { URLSearchParams } = require('url');



module.exports=router.get('/products',(req,res)=>{

    res.json(popularProducts)
  })
  

  //register

  module.exports=router.post('/register', async(req,res)=>{
    console.log(req.body)

    
        const user = await User.findOne({ email: req.body.email })
    
        if (user) {
          // user with this email already exists
          return res.status(409).json({ error: 'Email already registered' })
        }
        
    
 
   const newPassword = await bcrypt.hash(req.body.password, 10)
         const newUser=await User.create({
              name: req.body.name,
              email: req.body.email,
              password: newPassword,
          })
 
             
 
 
 newUser.save((err) => {
   if (err) {return console.log(err);}
   else {
     console.log("data saved from register")
                 return res.status(200).json(newUser);}
   
 });
 
 
 
 })
 
//login
module.exports=router.post('/login', async (req, res) => {

    console.log("login request")
    //   console.log(req.body)
      const { email, password } = req.body;
    
        const user = await User.findOne({
            
            email,
            
        })
        console.log("user is " + user)
        
        if (!user) {
            console.log("invalid email")
            return res.status(404).json({ error: 'User not found' });	
        }
    
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
    
        console.log("password valid is "+isPasswordValid)
    
        if (isPasswordValid) {
            console.log("inside valid password")
            console.log(user.password)
            console.log(req.body.password)
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
    
            )

            
    // Retrieve the user's previous orders
    console.log("user id is "+user._id)
    const ordersNew = await Order.find({ contactOrEmail: user.email })

    // const orders = await Order.find({ user: user._id });
  console.log("orders are from fetch ")
  console.log(JSON.stringify(ordersNew))

    return res.json({ status: 200, user: token, ordersNew });


    
            // return res.json({ status: 200, user: token })
        } else {
            console.log("inside invalid password")
            res.status(401).json({status:401,error})	
    }
    })
    


    
// // order
module.exports=router.post('/orders',async (req,res)=>{
    console.log(req.body)
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
       _id:userId
        // user: userId, // save the order with the user's ID
    })
    orderHere.save((err) => {
    if (err) {return console.log(err);}
    else {
        console.log("data saved " )
        return res.status(200).json(orderHere);}
    
    }
    );
    
    })
    
    
    
    
    // get order history
module.exports=router.get('/orders/:id', async (req, res) => {
    // const userId = req.user._id // retrieve the user ID from the token
    const userId = req.params.id;
console.log("user id is "+userId)
    const orders = await Order.find({ _id: userId })
    console.log(orders)
    return res.status(200).json(orders)
    })




    
    
    
    
    const nodemailer=require("nodemailer")


    
//email config
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sheixkijaan81@gmail.com",
        pass:"kpvciqvijbijibpb"
        
    }
    
    
    })





    //send password link
    module.exports=router.post("/sendpasswordlink",async(req,res)=>{

        // console.log(req.body)
        
        const {email}=req.body;
        if(!email)
        {
            res.status(401).json({
                status:401,message:"Enter your email"
            })
        }
        
        try{
            const userfind = await User.findOne({
                // email: req.body.email,
                // password:req.body.password
                email:email
            })
        
            // console.log("userfind ",userfind)
           
            const token=jwt.sign({_id:userfind._id},
            'secret123',{
                expiresIn:"1d"
        
            })
        //   console.log(token)
        
         const setusertoken=await User.findByIdAndUpdate(
            {
            _id:userfind._id	
            },{
                verifytoken:token
            },
            {
                new:true
            }
         )
        
        
         if(setusertoken){
        console.log("inside set user")
         const mailOptions={
            from:"sheixkijaan81@gmail.com",
            to:email,
            subject:"Sending email for password reset",
            text:`This link valid for 2 minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
         }
        console.log(mailOptions)
        transporter.sendMail(mailOptions,(error,info)=>{
        if(error) {
            console.log("error",error);
            res.status(401).json({
                status:401,message:"email not found"
            }	)  }
        else{
            console.log("Email sent ",info.response);
            res.status(200).json({status:200,message:"email sent success"})
        } }) } }
        catch(error){
            res.status(401).json({
                status:401,message:"invaliduser"
            } ) }
        })




        //verify user for forget password
        module.exports=router.get("/forgotpassword/:id/:token",async(req,res)=>{

            console.log("verify user here")
            // console.log(req.params)
            
            const {id,token}=req.params;
            // console.log(id)
            // console.log(token)
            try{
                const validuser=await User.findOne({
            
            
                    _id:id,
                    verifytoken:token
            
                })
            
              const verifyToken=jwt.verify(token,'secret123')
            console.log("verify token "+verifyToken)
               if(validuser && verifyToken._id){
              
            res.status(200).json({status:200,validuser})
            
               }
            else{
                res.status(401).json({status:401,message:"user does not exist"})
            
            }
            }
            catch(error) {
            
            console.log("error is "+error)
            
            res.status(401).json({status:401,error})
            
            }
            
            
            })
            
            



            

// changing password

// module.exports=router.post("/:id/:token",async(req,res)=>{

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



module.exports=router.post("/orders/userid",async(req,res)=>{
console.log("inside fetching history")
const useridhere="mughal@gmail.com";

const hello=[];
const newuseris = await Order.findOne({

    contactOrEmail:useridhere


})
if(newuseris)
{
    // const myArrayFromString = myString.split(',');

    console.log(newuseris.firstName)
    res.status(200).json({status:200,newuseris})

}

else {
    console.log("not found")
}





// Replace with your own PayFast credentials
const PAYFAST_MERCHANT_ID = '10029311';
const PAYFAST_MERCHANT_KEY = 'fucad3eashsey';

module.exports=router.get('/payfasthere', (req, res) => {

    console.log("backend inside paymment")
    res.json("hell")
  const { name, email, amount } = req.body;

  const params = new URLSearchParams();
  params.append('merchant_id', PAYFAST_MERCHANT_ID);
  params.append('merchant_key', PAYFAST_MERCHANT_KEY);
  params.append('return_url', 'http://localhost:3000/payment/success');
  params.append('cancel_url', 'http://localhost:3000/payment/cancel');
  params.append('notify_url', 'http://localhost:5000/api/payment/payfast/notify');
  params.append('name_first', name);
  params.append('email_address', email);
  params.append('amount', amount);
  params.append('item_name', 'My Product');
  params.append('item_description', 'Product Description');

  const signature = crypto
    .createHash('md5')
    .update(`${params.toString()}&passphrase=YOUR_PASSPHRASE`) // Replace with your own passphrase
    .digest('hex');

  params.append('signature', signature);

  res.redirect(`https://www.payfast.co.za/eng/process?${params.toString()}`);
});















// console.log(newuseris)
// console.log(useridhere)
// if(newuseris){

// console.log(newuseris)
//     console.log("user find")
//     res.json(newuseris)
// }

// else{
//     console.log("no user")
// }


})
