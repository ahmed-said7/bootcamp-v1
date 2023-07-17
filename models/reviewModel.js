let mongoose= require('mongoose');
let bootcampModel=require('../models/bootcampModel');
let reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    content:String,
    bootcamp:{type: mongoose.Schema.Types.ObjectId , ref:"Bootcamp"},
    user:{type: mongoose.Schema.Types.ObjectId , ref:"User"},
    },
    {
        timestamps:true
    });

reviewSchema.statics.calc=async function(bootcampId){
    let data=await this.aggregate(
        [
            {$match:{bootcamp:bootcampId}},
        {
            $group:
            {
                _id:"$bootcamp",
                averageRating:{$avg:"$rating"},
                ratingQuantity:{$sum:1},
            }
        }
        ]
        );
    if(data.length > 0){
        let averageRating=data[0].averageRating;
        let ratingQuantity=data[0].ratingQuantity;
        await bootcampModel.findByIdAndUpdate(bootcampId,{averageRating,ratingQuantity},{new:true});
    };
};

reviewSchema.post('save',function(doc){
    doc.constructor.calc(doc.bootcamp);
});

reviewSchema.post('remove',function(doc){
    doc.constructor.calc(doc.bootcamp);
});
let reviewModel=mongoose.model('Review',reviewSchema);
module.exports=reviewModel;