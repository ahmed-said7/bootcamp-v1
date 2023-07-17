let mongoose= require('mongoose');
let orderSchema= new mongoose.Schema({
    cartItems:
    [
        {
        course:{type:mongoose.Schema.ObjectId,ref:"Course"}
        ,price:Number,
        quantity:{default:1,type:Number}
        }
    ],
    totalPrice:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type:Date}
    ,isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    paymentMetod:{type:String,enum:['cash','online'],default:'cash'},
    addresse:[{type:mongoose.Schema.Types.ObjectId,ref:"Addresse"}]
    },
    {
        timestamps:true
    });
let orderModel=mongoose.model('Order',orderSchema);
module.exports=orderModel;