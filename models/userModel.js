let mongoose=require('mongoose');
let bcryptjs=require('bcryptjs');

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        minlength:6,
        maxlength:1000,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user',
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    logout:{type:Boolean, default:false},
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetCodeExpiredAt:Date,
    passwordVertifyResetCode:Boolean,
    profileImage:String,
    coverImages:[String],
    wishlist:[{type:mongoose.Schema.Types.ObjectId ,ref:"Course"}]
    },
    {
        timestamps:true
    });

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    };
    this.password=await bcryptjs.hash(this.password,12);
    next();
});


let userModel=mongoose.model('User',userSchema);
module.exports=userModel;