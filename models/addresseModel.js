let mongoose= require('mongoose');
let addresseSchema= new mongoose.Schema(
    {
        phone:String,
        details:String,
        city:String,
        postalCode:String,
    },
    {
        timestamps:true
    });
let addresseModel=mongoose.model('Addresse',addresseSchema);
module.exports=addresseModel;