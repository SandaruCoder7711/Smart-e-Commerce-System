const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    promotionType:{
        type:String,
        required:true
    },
    promoCode:{
        type:String,
        required:true
    },
    promoDiscount:{
        type:Number,
        required:true
    },
    sponsorName :{
        type:String,
        required:true
    },
    promoStartDate :{
        type:String,
        required:true
    },
    promoEndDate :{
        type:String,
        required:true
    }
});

module.exports = mongoose.model(
    "promo_details",
    userSchema
)