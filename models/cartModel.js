let mongoose= require('mongoose');
let cartSchema= new mongoose.Schema({
    cartItems:[{course:{type:mongoose.Schema.ObjectId,ref:"Course"}
    ,price:Number,quantity:{default:1,type:Number}}]
    ,totalPrice:Number
    ,totalPriceAfterDiscount:Number,
    user:{type:mongoose.Schema.ObjectId,ref:"User"},
},
    {
        timestamps:true
    });
let cartModel=mongoose.model('Cart',cartSchema);
module.exports=cartModel;