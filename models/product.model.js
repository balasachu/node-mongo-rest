const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new Schema({
    product_name:{
        type:String,
        required:true,
        lowercase:true,
        max:255
    },
    product_price:{
        type:Number,
        required:true
    }
})

const product = mongoose.model('product',productSchema)
module.exports = product