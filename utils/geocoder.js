var NodeGeocoder = require('node-geocoder');
require('dotenv').config({path:'./environ.env'});


let options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.API,
    formatter: null
};

var geocoder = NodeGeocoder(options);
module.exports=geocoder;