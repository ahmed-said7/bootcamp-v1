let mongoose = require('mongoose');
let bootcampModel=  require('../models/bootcampModel');



let courseSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    sold:{type:Number,default:0},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    ,bootcamp:{type:mongoose.Schema.Types.ObjectId,ref:"Bootcamp",required:true},
    minimumSkils: {   type:String,
        enum:['begineer','medium','senior']
        ,default:'begineer'}
    ,weeks:{type:String,required:true},
    description:{type:String,required:true}
    ,scholarshipAvailable: {
        type: Boolean,
        default: false
    },
},{timestamps:true});



courseSchema.statics.calc=async function(bootcampId){
    let data=await this.aggregate(
        [
            {$match:{bootcamp:bootcampId}},
        {
            $group:
            {
                _id:"$bootcamp",
                NumberOfCourses:{$sum:1},price:{$sum:"$price"},weeks:{$sum:"$weeks"}
            }
        }
        ]
        );
    if(data.length > 0){
        let NumberOfCourses=data[0].NumberOfCourses;
        let price=data[0].price;
        let weeks=data[0].weeks;
        await bootcampModel.findByIdAndUpdate(bootcampId,{NumberOfCourses,price,weeks},{new:true});
    };
};


courseSchema.post('save',function(doc){
    doc.constructor.calc(doc.bootcamp);
});


courseSchema.post('remove',function(doc){
    doc.constructor.calc(doc.bootcamp);
});


let courseModel=mongoose.model('Course',courseSchema);
module.exports=courseModel;