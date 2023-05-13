const mongoose = require('mongoose');


const customOrderSchema=new mongoose.Schema({



//     user:{
// type:Schema.Types.ObjectId,
// // ref: "User",
// required: true,
//     },
categoryOfShoe:{
    type:String,
    required:true
},
upperShoe:{
    type:String,
    required:true
},

bottomSoleShoe:{
    type:String,
    required:true
},
colorShoe:{
    type:String,
    required:true
},

firstName:{
    type:String,
    required:true
},
lastName:{
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
path:{
    type:String
},
dynamicPric:{

    type:Number,
    required:true
},
// dynamicPrice:{
//     type:Number,
//     required:true
// },

createdAt: {
    type: Date,
    default: Date.now
  }},
  { collection: 'user-customorder' }


)
const CustomShoe = mongoose.model('customShoe', customOrderSchema)

module.exports = CustomShoe
