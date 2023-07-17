let express=require('express');
const morgan = require('morgan');
let app = express();
let path = require('path');
require('dotenv').config({path:'./environ.env'});
let connectionToDB=require('./config/database')
const globalError = require('./middlewares/globalError');
connectionToDB(process.env.URL);
let cors=require('cors');
let apiError=require('./utils/apiError');

let {webhookSession}=require('./services/orderServices');

app.use(cors('*'));


app.route('/webhook').post( express.raw({type: 'application/json'}), webhookSession );

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'uploads')));



let userRoute=require('./routes/userRoute');
let bootcampRoute=require('./routes/bootcampRoute');
let courseRoute=require('./routes/courseRoute');
let wishlistRoute=require('./routes/wishlistRoute');
let reviewRoute=require('./routes/reviewRoute');
let orderRoute=require('./routes/orderRoute');
let cartRoute=require('./routes/cartRoute');
let couponRoute=require('./routes/couponRoute');
let addresseRoute=require('./routes/addresseRoute');


app.use('/api/v1/users',userRoute);
app.use('/api/v1/wishlists',wishlistRoute);
app.use('/api/v1/bootcamps',bootcampRoute);
app.use('/api/v1/courses',courseRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/carts',cartRoute);
app.use('/api/v1/coupons',couponRoute);
app.use('/api/v1/addresses',addresseRoute);


app.all('*',(req,res,next)=>{
    return next(new apiError('not found route',400));
});


app.use(globalError);




app.listen(3000,()=>{
    console.log('hello Eng Ahmed Saied connetion successsfully');
})



process.on('unhandledRejection',(err)=>{
    console.log(err)
});

