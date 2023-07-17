let mongoose=require('mongoose');
let bcryptjs=require('bcryptjs');

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    photo:String,
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

userSchema.post('init',(doc)=>{
    if(doc.photo){
        let url=`http://localhost:3000/users/${doc.photo}`;
        doc.photo=url
    };
});

userSchema.post('save',(doc)=>{
    if(doc.photo){
        let url=`http://localhost:3000/users/${doc.photo}`;
        doc.photo=url
    };
});

let userModel=mongoose.model('User',userSchema);
module.exports=userModel;