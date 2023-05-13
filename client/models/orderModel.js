const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

      _id:{
        type:String,
        required:true
      },
    // contactNumber:{
    //     type:Number,
    //     required:true
    // },
    contactOrEmail:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phoneNum:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    paymentId: {
        type: String, // or whatever data type Razorpay uses for payment IDs
        default: null
      },
      advanceDeposit:{
        type:Number,
        default:null
      },
      remainingAmount:{
        type:Number,
        default:null
      },


    createdAt: {
        type: Date,
        default: Date.now
      }},
      { collection: 'user-testorder' }
    );

    const Order = mongoose.model('Order', orderSchema);

    module.exports = Order;





    // product:{
    //     type:String,
    //     required:true
    // },

    // products:[
    //     {
    //         productId:{
    //             type:mongoose.Schema.Types.ObjectId,
                
    //         }
    //     }
    // ],
    // quantity:{
    //     type:Number,
    //     required:true
    // },
    // totalPrice:{
    //     type:Number,
    //     required:true
    // },
    // shippingAddress:{
    //     type:String,
    //     required:true
    // },
    // orderStatus:{
    //     type:String,
    //     enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    //     default: 'Pending'
    // },
   
