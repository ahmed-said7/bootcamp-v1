let mongoose= require('mongoose');
let couponSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:4,
        maxlength:12,
        required:true,
        unique:true,
    },
    couponExpiredAt:{type:Date,default:Date.now()},
    discount:{
        type:Number,
        required:true
    },
    },
    {
        timestamps:true
    });
let couponModel=mongoose.model('Coupon',couponSchema);
module.exports=couponModel;