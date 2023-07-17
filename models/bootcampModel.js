const mongoose  = require("mongoose");
let geocoder = require("../utils/geocoder");
let bootcampSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true}
        ,
    photo: {
        type: String,
        },
    housing: {
            type: Boolean,
            default: false
        },
    jobAssistance: {
            type: Boolean,
            default: false
        },
    jobGuarantee: {
            type: Boolean,
            default: false
        },
    price:{
        type: Number,
    },
    averageRating:{
        type: Number,
    },
    ratingQuantity:{
        type: Number,
    },
    NumberOfCourses:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    addresse:[{type:mongoose.Schema.Types.ObjectId,ref:'Addresse'}],
    locationAddresse:{type:String,required:true},
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    careers: {
        type: String,
        required: true,
        enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']
    },
    description:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    weeks:Number,
    email:{
        type: String,
        required: true,
    },
    // location:{type:[Number]} 
    },
    {
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
        );

bootcampSchema.pre('save',async function(next){
    if(!this.coordinates){
        let pos=await geocoder.geocode(this.locationAddresse);
        this.coordinates=[pos[0].latitude,pos[0].longitude];
    };
    next();
});

bootcampSchema.virtual("courses",{
    ref:"Course",
    localField:"_id",foreignField:"bootcamp",
});

bootcampSchema.virtual("reviews",{
    ref:"Review",
    localField:"_id",foreignField:"bootcamp"
});



let bootcampModel=mongoose.model('bootcamp',bootcampSchema);
module.exports=bootcampModel;







