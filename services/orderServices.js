let handler=require('express-async-handler');
let Order=require('../models/orderModel');
let Cart=require('../models/cartModel');
let Course=require('../models/cartModel');
let User=require('../models/userModel');
require('dotenv').config({path:'./environ.env'});
let apiError=require('../utils/apiError');
let stripe=require('stripe')(process.env.STRIPE_API);


let createOrder=handler(
    async(req,res,next) =>{
        let taxPrice=0;
        let shippingPrice=0;
        let cart = await Cart.findOne({user:req.user._id});
        if(!cart){
            return next(new apiError('cart not found',400));
        };
        let cartItems=cart.cartItems;
        let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
        totalPrice = totalPrice+taxPrice+shippingPrice;
        await Promise.all(cartItems.map(async(item)=>{
            await Course.findByIdAndUpdate(item.course,{$inc:{sold:1}},{new:true});
        }));
        let user=req.user._id;
        let order=await Order.create({cartItems,totalPrice,user});
        // await Cart.findOneAndDelete({user});
        res.status(200).json({status: 'success',order});
    }
);



let getLoggedUserOrder=handler(async(req, res, next)=>{
    let order=await Order.findOne({user:req.user._id});
    if(!order){
        return next(new apiError('order not found',400));
    };
    res.status(200).json({order,status:"success"});
});



let updateDeliveredOrder=handler(async(req, res, next)=>{
    let order=await Order.findOneAndUpdate(
        {_id:req.params.id}
        ,{  isDelivered:true , deliveredAt:Date.now()  },
        {new:true}
        );
    if(!order){
        return next(new apiError('order not found',400));
    };
    res.status(200).json({order,status:"success"});
});



let updatePaidOrder=handler(async(req, res, next)=>{
    let order=await Order.findOneAndUpdate(
        {_id:req.params.id}
        ,{  isPaid:true , paidAt:Date.now()  },
        {new:true}
        );
    if(!order){
        return next(new apiError('order not found',400));
    };
    res.status(200).json({order,status:"success"});
});



let getSpecificOrder=handler(async(req, res, next)=>{
    let order=await Order.findOne({_id:req.params.id});
    if(!order){
        return next(new apiError('order not found',400));
    };
    res.status(200).json({order,status:"success"});
});



let checkoutSession=handler(async(req,res,next)=>{
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
        return next(new apiError('cart not found',400));
    };
    let price=cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice;
    console.log(cart._id,req.user.email);
    let session = await stripe.checkout.sessions.create({
        line_items: [
        {
            price_data :
                { 
                        unit_amount:price*100 , 
                        currency:'egp' , 
                        product_data:{name:req.user.name} 
                } , 
            quantity:1
        },
                ],
        mode: 'payment',
        
        success_url:`${req.protocol}://${req.get('host')}/order`,
        cancel_url:`${req.protocol}://${req.get('host')}/cart`,
        customer_email:req.user.email,
        client_reference_id:cart._id.toString(),
        });
        res.status(200).json({status:"success",data:session});
});



let createOnlineOrder=handler(async(session)=>{
        let email=session.customer_email;
        let cartId=session.client_reference_id;
        let cart = await Cart.findById(cartId);
        if(!cart){
            return next(new apiError('cart not found',400));
        };
        let cartItems=cart.cartItems;
        let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
        await Promise.all(cartItems.map(async(item)=>{
            await Course.findByIdAndUpdate(item.course,{$inc:{sold:1}},{new:true});
        }));
        let user=await User.findOne({email});
        
        await Order.create({
            cartItems,totalPrice,user:user._id,
            isPaid:true,paidAt:Date.now()
        });

        await Cart.findByIdAndDelete(cartId);
        
})


let webhookSession=handler(async(req,res,next)=>{

    let event;
    let signature = req.headers['stripe-signature'];

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.WHSEC
        );
    } catch (err) {
        return next(new apiError(err.message,400));
    };

    if(event.type === "checkout.session.completed") {
        await createOnlineOrder(event.data.object);
    };

    });

module.exports={createOrder,updatePaidOrder,updateDeliveredOrder,
    getLoggedUserOrder,getSpecificOrder,checkoutSession,webhookSession};